import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
//import { auth } from './firebase-config';
import {addDoc, collection,} from 'firebase/firestore';
function ApplicationForm() { 
    const [role,setRole] = useState("");
    
    const UserCollectionRef = collection(db,"Roles");

    const Addrole = async () => {
        

        try{
        await addDoc(UserCollectionRef,{
            role: role,
            email: auth.currentUser.email,
            status : "pending",
            

        });
        console.log("Data Added!");
        
    }
        catch(err){
            console.log(err.messege);
        };
        
    }
    

    return (
        <div>
            <h2>Apply for Role</h2>
            <form>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
            <button onClick={Addrole} type='submit'>Apply</button>
            </form>
        </div>
    );
 
};

export default ApplicationForm;