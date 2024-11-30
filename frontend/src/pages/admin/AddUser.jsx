import { useState } from "react"
import Navbar from "../../components/Navbar"
import axios from "../../axios"
import Axios from "axios"
import { showToastSuccess, showToastError } from "../../toastConfig"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AddUser = () => {

    const [profilePicture, setProfilePicture] = useState(null)
    const [userName, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)

    const token = useSelector(state => state.auth.admin.token)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        const stringRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.\s-]{4,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,}$/;
    
        e.preventDefault()
    
        try {
          if(!stringRegex.test(userName)){
            setError("Enter valid Username");
            setShowError(true);
            return; 
          }else if(!emailRegex.test(email)){
            setError("Enter a valid email")
            setShowError(true);
            return;
          }else if(!passwordRegex.test(password)){
            setError("Enter a strong password")
            setShowError(true);
            return;
          }else if(confirmPassword !== password){
            setError("confirm your password");
            setShowError(true)
            return;
          }else{
            setError("")
            setShowError(false)
            try {
                await axios.post("/admin/addUser",{
                userName,
                email,
                password,
                profilePicture
              },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
              })
              navigate('/admin/dashboard')
              showToastSuccess("New User Added")
            } catch (error) {
              if(error.response && error.response.data.error){
                showToastError(error.response.data.error)
              }
            }
          }
        } catch (error) {
          console.error(error.message)
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
            
            setProfilePicture(response.data.secure_url);
            showToastSuccess("Image uploaded successfully")
        } catch (error) {
            console.error('Image upload failed', error)
        }
    }

    return (
    <div className="h-screen overflow-hidden bg-bgg-image bg-cover bg-center ">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
      <Navbar page={"Add New User"} role={"admin"} prev={"Dashboard"}/>
      {/* Login */}
      <div className="relative z-10 flex items-center justify-center h-full pb-20">
        <div className="w-[500px] bg-slate-400 opacity-80 p-10 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <img
                        src={profilePicture}
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
              <input onChange={(e)=>setUserName(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Username" type="text"/>
              <input onChange={(e)=>setEmail(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Email" type="email"/>
              <input onChange={(e)=>setPassword(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Password" type="password"/>
              <input onChange={(e)=>setConfirmPassword(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Confirm Password" type="password"/>
              {
                showError && <div>
                  <span className="font-medium text-red-600">{error}</span>
                </div>
              }
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="border-2 py-2 px-16 rounded-lg">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default AddUser;