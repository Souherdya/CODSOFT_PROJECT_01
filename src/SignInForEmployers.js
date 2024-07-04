import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { toast } from 'react-toastify';
import "./SignUp.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function SignInForEmployers(){
    const navigate = useNavigate();
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    
    const LogInAcount=(e)=>{
        e.preventDefault();
        
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            toast.success("Logged In successfuly!");
            navigate("/AccountHandling")
            
        })
        .catch((error)=>{toast.error("Wrong credentials!")})
        
    }
    
   
    
    
    return (
        
        <div>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
    <div class="login-container">
        <h1>Sign In</h1>
        <h3>As an Employer</h3>
        <form id="signup-form" onSubmit={LogInAcount}>
        <input type="email" class='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><i class='bx bxs-user'></i>
        <input type="password" class='input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><i class='bx bxs-key'></i>
        <div class="rem">
            <div class="remme"><label><input type="checkbox"/>&nbsp;Remember me</label></div>
            <div class="forgot">Forgot password?</div>
            </div>
       <button class="b" type="submit">Sign in</button>
    </form>
    <p>Dont have an account?</p>
    <Link to="/SignUpForEmployers" className='Reg'>Register</Link>
    
    </div>
            </div>
            
    );

}