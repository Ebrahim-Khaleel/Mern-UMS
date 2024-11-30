import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
    const user = useSelector(state => state.auth.user)
    
    return(
        <div className="h-screen overflow-hidden bg-bg-image bg-cover bg-center">
            <Navbar page={"Profile"}/>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
            <div className="flex items-center justify-center h-full relative z-10">
                
            <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg flex items-center w-[800px] mb-10">
                {/* Left Section: User Image */}
                <div className="flex-shrink-0 mr-6">
                    <img
                    src={user?.profilePicture} // Fallback image
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-400"
                    />
                </div>
                {/* Right Section: User Info */}
                <div className="text-left">
                    <h1 className="text-2xl font-bold mb-2">WELCOME, {user?.userName || "Guest"}</h1>
                    <p className="text-lg font-medium text-gray-700">Email: {user?.email || "Not Available"}</p>
                </div>
                <div className="ml-36 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10">
                    <Link to={"/profile"}>Edit Profile</Link>
                </div>
            </div>
      </div>
        </div>
    )
}

export default Home;