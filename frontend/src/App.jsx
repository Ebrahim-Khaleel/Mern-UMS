import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/user/Profile";
import EditUser from "./pages/admin/EditUser";
import AddUser from "./pages/admin/AddUser";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const App = () => {
    const user = useSelector(state=> state.auth.user)
    const admin = useSelector(state => state.auth.admin)
    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={ !user ? <Login/> : <Navigate to={"/user"}/> } />
                    <Route path="/signup" element={ !user ? <Signup/> : <Navigate to={"/user"}/> } />
                    <Route path="/user" element={ user ? <Home/> : <Navigate to={"/login"}/> } />
                    <Route path="/profile" element={ user ? <Profile/> : <Navigate to={"/login"}/> } />
                    <Route path="/admin/login" element={ !admin  ? <AdminLogin/> : <Navigate to={"/admin/dashboard"}/> } />
                    <Route path="/admin/dashboard" element={ admin ? <Dashboard/> : <Navigate to={"/admin/login"}/> } />
                    <Route path="/admin/edituser/:userId" element={ admin ? <EditUser/> : <Navigate to={"/admin/login"}/> } />
                    <Route path="/admin/createuser" element={ admin ? <AddUser/> : <Navigate to={"/admin/login"} />} />
                </Routes>
            </Router>
            <ToastContainer/>
        </div>
    )
}

export default App;