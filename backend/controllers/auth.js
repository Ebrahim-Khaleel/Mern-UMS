import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// USER REGISTERATION //
export const register = async(req, res) => {
    try {
        const { userName, email, password } = req.body

        if(!userName || !email || !password){
            return res.status(400).json({ error : "Pleae provide all required fields"})
        }
    
        const exitsingUser = await userModel.findOne({email});
        if(exitsingUser){
            return res.status(400).json({error : "Email address already taken"})
        }
    
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new userModel({
            userName,
            email,
            password:encryptedPassword,
        })
    
        const user = await newUser.save()
    
        const accessToken = jwt.sign({ id : user._id, role : 'user'}, process.env.JWT_SECRET)

        // modifying user data
        const userData = user.toObject()
        delete userData.password;
    
        return res.status(201).json({
            user : userData,
            accessToken,
            message : "Registration Successful"
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
        console.log('efds');
        
        const user = await userModel.findOne({ email : email });
        
        if(!user) return res.status(400).json({error : "Invalid email address!"})

        const match = await bcrypt.compare(password, user.password);
        
        if(!match) return res.status(400).json({error : "Invalid credentials"})

        const accessToken = jwt.sign({id : user._id, role : 'user'}, process.env.JWT_SECRET);

        // modifying user data
        const userData = user.toObject()
        delete userData.password;

        return res.status(201).json({ accessToken, user : userData, message : "Authentication Successful" })
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'Something went wrong'})
    }
}