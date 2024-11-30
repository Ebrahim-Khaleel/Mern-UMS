import axios from "../../axios"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../reduxStore/authSlice";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { deleteUser } from "../../reduxStore/authSlice";
import { useNavigate } from "react-router-dom";
import { showToastSuccess } from "../../toastConfig";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const users = useSelector(state => state.auth.allUsers)
    const token = useSelector(state => state.auth.admin.token)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/admin/getAllUsers");
                console.log(response.data);
                dispatch(
                    getAllUsers({
                        users: response.data.users,
                    })
                );
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, [])

    const handleDelete = async(userId) => {
        
        await axios.delete(`/admin/deleteUser/${userId}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        dispatch(deleteUser(userId))
        showToastSuccess("User deleted")
    }

    const filteredUsers = users.filter((user)=>(
        user.userName.toLowerCase().includes(searchTerm)
    ))

    return(
        <div className="h-screen overflow-hidden bg-bgg-image bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 opacity-70"></div>
            {/* Login */}
            <Navbar page={"Dashboard"} role={'admin'} />
            <div className="rounded mt-16 mx-20">
                <div className="bg-white/70  relative p-6  flex justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Link to={'/admin/createuser'}><button className="border border-black p-2 rounded bg-black text-white text-xs font-medium">+ Add User</button></Link>
                </div>
                <ul role="list" className="relative divide-y divide-gray-100 p-10 bg-black/70  max-h-[500px] overflow-y-auto">
                    {filteredUsers.length != 0 ? filteredUsers.map((user)=>(
                        <li key={user._id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-6">
                        <img alt="" src={user.profilePicture} className="size-12 flex-none rounded-full bg-gray-50" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-white">{user.userName}</p>
                            <p className="mt-1 truncate text-xs/5 text-gray-400">{user.email}</p>
                        </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex  gap-1 sm:items-end">
                        <button onClick={()=>navigate(`/admin/edituser/${user._id}`)} className="items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10">Edit</button>
                        <button onClick={()=>handleDelete(user._id)} className="items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10">Delete</button>
                        </div>
                    </li>
                    )) : (
                        <div className="flex justify-center text-white font-semibold text-xl">NO USERS EXISTS</div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;