import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const accessToken = jwt.sign({ admin : email, role : 'admin'}, process.env.JWT_SECRET)
            return res.status(201).json({ 
                admin : email,
                accessToken
            });
        }else{
            return res.status(400).json({error : "Invalid Credentials"})
        }
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find()
        if(users){
            res.status(201).json({ users });
        }else{
            res.status(400).json({ error : "No Users Data Available" });
        }
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export const addUser = async(req, res) => {
    try {
        
        const { userName, email, password, profilePicture } = req.body

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
            profilePicture
        })
    
        const user = await newUser.save()

        return res.status(201).json("Success")

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { userId } = req.params
        
        const deleted = await userModel.findByIdAndDelete(userId)
        res.status(201).json("User Account deleted successfully")
        
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export const editUser = async(req, res) => {
    try {
        
        const { userId } = req.params;
        const { userName, profilePicture } = req.body

        const updated = await userModel.findByIdAndUpdate(userId,{
            $set : {
                userName : userName,
                profilePicture : profilePicture
            }
        },{ new : true }
        )
        
        res.status(201).json({ user : updated })

    } catch (error) {
        res.status(500).json({ error : error.message})
    }
}

export const getUserData = async(req, res) => {
    try {
        const { userId } = req.params;

        const user = await userModel.findOne({ _id : userId })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}