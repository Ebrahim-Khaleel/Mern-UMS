import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "../../axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reduxStore/authSlice";
import { showToastError, showToastSuccess } from "../../toastConfig";


const Signup = () => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch()
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
          const response = await axios.post("/signup",{
            userName,
            email,
            password,
          })
          console.log(response.data)
          dispatch(
            setLogin({
              user : response.data.user,
              token : response.data.accessToken
            })
          )
          navigate('/user')
          showToastSuccess("Registeration Successful")
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

  return (
    <div className="h-screen overflow-hidden bg-bg-image bg-cover bg-center ">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
      <Navbar page={"Sign Up"}/>
      {/* Login */}
      <div className="relative z-10 flex items-center justify-center h-full pb-20">
        <div className="w-[500px] bg-slate-400 opacity-80 p-10 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
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
              <button type="submit" className="border-2 py-2 px-16 rounded-lg">Sign up</button>
            </div>
          </form>
          <div className="flex gap-2 mt-10">
            <p>Have an account?</p><Link to={"/login"}><span>Login</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
