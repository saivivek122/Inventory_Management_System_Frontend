import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"



const AuthContext=createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(null)


useEffect(()=>{
    const savedUser=localStorage.getItem("user");
    if(savedUser){
        setUser(JSON.parse(savedUser))
    }
},[])

const loginUser=async(email,password)=>{
    console.log("email",email,"password",password)
    try{
        const res=await axios.post("http://localhost:3000/auth/login",{
            email,
            password
        })
        console.log("the response is",res)
        const loggedInUser=res.data;
        console.log(loggedInUser,"looged in user")
        setUser(loggedInUser);
        localStorage.setItem("user",JSON.stringify(loggedInUser));
        return true
    }
    catch(err){
        return false
    }
}
const logoutUser=()=>{
    setUser(null);
    localStorage.removeItem("user")
}
return(
    <AuthContext.Provider value={{user,loginUser,logoutUser}}>
        {children}
    </AuthContext.Provider>
)
}
export function useAuth(){
    return useContext(AuthContext)
}