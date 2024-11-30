import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        profilePicture : {
            type : String,
            default : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        }
    },{timestamps : true}
);

const userModel = mongoose.model("user", userSchema);
export default userModel;