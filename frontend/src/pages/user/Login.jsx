import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../axios"
import { useDispatch } from "react-redux"
import { setLogin } from "../../reduxStore/authSlice"
import Navbar from "../../components/Navbar"
import { toast } from "react-toastify"
import { showToastSuccess, showToastError } from "../../toastConfig"

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    e.preventDefault();

    try {
      if(!emailRegex.test(email)){
        setError("Invalid email address")
        setShowError(true);
        return;
      }else if(!password || password.trim() === ''){
        setError("Invalid Password")
        setShowError(true);
        return;
      }else{
        setError("")
        try {
          const response = await axios.post("/login", {
            email,
            password
          })
  
          dispatch(
            setLogin({
              user : response.data.user,
              token : response.data.accessToken
            })
          )
          navigate('/user')
          showToastSuccess("Login Successful")
        } catch (error) {
          if(error.response && error.response.data.error){
            showToastError(error.response.data.error, { autoClose : 2500 })
          }
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-bg-image bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
      <Navbar page={"Login"}/>
      {/* Login */}
      <div className="relative z-10 flex items-center justify-center h-full pb-20">
        <div className="w-[500px] bg-slate-400 opacity-80 p-10 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input onChange={(e)=>setEmail(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Email" type="email"/>
              <input onChange={(e)=>setPassword(e.target.value)} className="my-3 bg-slate-100 p-3 rounded-lg" placeholder="Password" type="password"/>
              {
                showError && <div>
                  <span className="font-medium text-red-600">{error}</span>
                </div>
              }
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="border-2 py-2 px-16 rounded-lg">Login</button>
            </div>  
          </form>
          <div className="flex gap-2 mt-10">
            <p>Don't have an account?</p><Link to={"/signup"}><span>Sign up</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login