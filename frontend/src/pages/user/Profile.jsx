import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { updateProfile } from "../../reduxStore/authSlice";
import axios from "../../axios";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToastSuccess } from "../../toastConfig";

const Profile = () => {
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.user.token)
    console.log('tk', token)

    const [userName, setUserName] = useState(user?.userName || "");
    const [profilePic, setProfilePic] = useState(user?.profilePicture || "")
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSubmit = async(e) => {
        const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/

        e.preventDefault()

        try {
            if(!stringRegex.test(userName)){
                setError("Enter valid Username");
                setShowError(true);
                return; 
            }else{
                setError("")
                setShowError(false)
                
                const response = await axios.post(`/user/${user._id}/editProfile`,{
                    userName : userName,
                    profilePicture : profilePic
                }, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                dispatch(
                    updateProfile({
                        user : response.data.user,
                        token : response.data.token
                    })
                )
                navigate('/user')
                showToastSuccess("Profile Updated")
            }
        } catch (error) {
            console.error(error.message);
        }
        
    }

    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        if(!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "newpreset")
        formData.append("cloud_name", "dhcoeivjw")

        try {
            const response = await Axios.post('https://api.cloudinary.com/v1_1/dhcoeivjw/image/upload', formData)
            
            setProfilePic(response.data.secure_url);
            showToastSuccess("Image uploaded successfully")
        } catch (error) {
            console.error('Image upload failed', error)
        }
    }

    return(
        <div className="h-screen overflow-hidden bg-bg-image bg-cover bg-center">
            <Navbar page={"Edit Profile"} prev={"Profile"}/>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
            <div className="relative z-10 flex items-center justify-center h-full pb-20">
                <div className="w-[500px] bg-slate-400 opacity-80 p-10 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img
                                    src={profilePic}
                                    alt="User Avatar"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                                />
                                {/* Image Upload Button */}
                                <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full opacity-70 cursor-pointer">
                                    <PaperClipIcon className="w-6 h-6 text-gray-700" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute bottom-0 right-0 w-8 h-8 text-sm opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input onChange={(e)=>setUserName(e.target.value)} value={userName} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Username" type="text"/>
                            {
                                showError && <div>
                                <span className="font-medium text-red-600">{error}</span>
                                </div>
                            }
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="border-2 py-2 px-16 rounded-lg">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;