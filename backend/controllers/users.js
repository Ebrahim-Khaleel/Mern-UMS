import userModel from "../models/userModel.js";

// USER PROFILE EDIT //
export const editProfile = async(req, res) => {
    const { userId } = req.params;
    const { userName, profilePicture } = req.body;
    
    try {
        if(userId !== req.user.id){
            return res.status(401).json({ error : "Unauthorized" });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    userName : userName,
                    profilePicture : profilePicture
                }
            },
            { new : true }
        );

        if(!user){
            return res.status(404).json({ error : "User not found" })
        }
        res.status(201).json({user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : "Server error" })
    }
}