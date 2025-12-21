import React from 'react'
import {Navigate, useNavigate,Outlet} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
const ProtectedRoute = ({children}) => {
    const {user}=useAuth()
    const navigate=useNavigate()
    console.log("the user is",user)
    console.log(user,"from")
    // if(!user){
    //    return <Navigate to="/login" replace/>
    // }
    // return children
    return user ?<Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute
