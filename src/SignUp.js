import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
//import { doc,setDoc } from 'firebase/firestore';
import "./SignUp.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 
export default function Create(){
    const navigate = useNavigate();
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    const CreateAccount= async (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            console.log(userCredentials)
            toast.success("user created successfully!")
            navigate("/Account");
        })
    }

    
    return (
        <div>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
    <div class="login-container">
        <h1>Sign Up</h1>
        <form action="#" id="signup-form" onSubmit={CreateAccount}>
        <input type="email" class='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><i class='bx bxs-user'></i>
        <input type="password" class='input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><i class='bx bxs-key'></i>
        <div class="rem">
            <div class="remme"><label><input type="checkbox"/>&nbsp;Remember me</label></div>
            <div class="forgot"><a href="#">Forgot password?</a></div>
            </div>
        <button class="b" type="submit">Sign Up</button>
    </form>
    
    </div>
            </div>
    );

}
