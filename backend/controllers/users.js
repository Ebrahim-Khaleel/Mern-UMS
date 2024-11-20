import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// USER REGISTERATION //
export const register = async(req, res) => {
    try {
        const { userName, email, password, phone } = req.body

        if(!userName || !email || !password || !phone){
            return res.status(400).json({ error : "Pleae provide all required fields"})
        }
    
        const exitsingUser = await userModel.findOne({email});
        if(exitsingUser){
            return res.status(400).json({error : "Email address already taken"})
        }
    
        const encryptedPassword = await bcrypt.hash(password, 10)
        
        const newUser = new userModel({
            userName,
            email,
            password:encryptedPassword,
            phone
        })
    
        const user = await newUser.save()
    
        const accessToken = jwt.sign({ id : user._id}, process.env.JWT_SECRET)
    
        return res.status(201).json({
            user,
            accessToken,
            message : "Registration Successfull"
        })   
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Something went wrong"})
    }
}

// USER AUTHENTICATION //
export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await userModel.findOne({ email : email });
        if(!user) return res.status(400).json({error : "Invalid email address!"})

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({error : "Invalid credentials"})

        const accessToken = jwt.sign({id : user._id}, process.env.JWT_SECRET);

        return res.status(201).json({ accessToken, user, message : "Authentication Successfull" })
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Something went wrong'})
    }
}