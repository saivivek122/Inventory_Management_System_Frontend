import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/styles.css"
import loginLogo from "../assets/Login.jpg"
const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const navigate=useNavigate();
  const {loginUser,user}=useAuth()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    

    try{
      const success=await loginUser(email,password);
      console.log(success)
      if(success){
        if(user.role=="admin"){
        navigate("/dashboard")
        }
        else{
          navigate("/user")
        }
      }
      else {
        setError("Invalid email or password")
      }
      
    }
    catch(error){
      setError("Invalid Email Or Password")
    }
  }
  return (
    <div className="login-container" >
      <h2 className="login-text">Login</h2>
      <p>See Your Growth..</p>
     <p className="login-message">{error}</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
        <input
          className="login-input"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password*</label>
        <input
        className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>       
      </form>
       <p>Don't have an account ? <Link to="/register">Click Here</Link></p>
     {/* <img src={loginLogo} className="login-logo"/> */}
     

    </div>
  );
};

export default Login;

