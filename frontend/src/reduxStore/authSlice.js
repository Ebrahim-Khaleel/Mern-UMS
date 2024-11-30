import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    admin : localStorage.getItem('admin')
        ? JSON.parse(localStorage.getItem('admin'))
        : null,
    allUsers : []
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setAdminLogin : (state, action) => {
            state.admin = {
                admin : action.payload.admin,
                token : action.payload.token
            }
            localStorage.setItem('admin', JSON.stringify(state.admin));
        },
        setAdminLogout : (state) => {
            state.admin = null
            localStorage.removeItem('admin')
        },
        getAllUsers : (state, action) => {
            state.allUsers = action.payload.users
        },
        updateProfile : (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload.user
            }
        },
        deleteUser: (state, action) => {
            state.allUsers = state.allUsers.filter((user) => user._id !== action.payload);
        },
        setLogin : (state, action) => {
            state.user = {
                ...action.payload.user,
                token : action.payload.token
            }
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        setLogout : (state) => {
            state.user = null;
            localStorage.removeItem('user')
        },
    }
})

export const { setLogin, setAdminLogin, getAllUsers, updateProfile, deleteUser, setLogout, setAdminLogout } = authSlice.actions
export default authSlice.reducer;