import axios from "axios";
import React, { useState } from "react";
import {Link} from "react-router-dom"
const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message,setMessage]=useState("")
  async function handleRegister(e){
    e.preventDefault()
    try{
        const res=await axios.post("https://inventory-management-system-backend-qi6b.onrender.com/auth/register",{
          name: registerDetails.name,
           email: registerDetails.email,
           password:registerDetails.password
        })
        console.log(res.data)
        setMessage(res.data)
        setRegisterDetails({...registerDetails,name:"",email:"",password:""})
    }
    catch(error){
        console.log(error)
        setMessage(error.response.data)
    }

  }
  return (
    <div>
      <h3 className="register-text">Create Your Account</h3>
      <p className="message">{message}</p>
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="name">Name</label>
        <input id="name"
         required 
         type="text"
         value={registerDetails.name}
         onChange={(e)=>setRegisterDetails({...registerDetails,name:e.target.value})}
         placeholder="Enter Your Name" />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          required
          type="email"
          value={registerDetails.email}
          onChange={(e)=>setRegisterDetails({...registerDetails,email:e.target.value})}
          placeholder="Enter Your Email"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          required
          type="password"
          value={registerDetails.password}
          onChange={(e)=>setRegisterDetails({...registerDetails,password:e.target.value})}
          placeholder="Enter Your Password"
        />
    
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="already-have-an-account-text">Already have an account?<Link to="/login">Click here</Link></p>
    </div>
  );
};

export default Register;
