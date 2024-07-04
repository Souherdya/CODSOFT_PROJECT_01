import React from 'react';
import { useState,useEffect } from 'react';
import './AccountHandlingForEmployers.css';
import { auth, storage } from './firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { query } from 'firebase/firestore';
import { getDocs,where} from 'firebase/firestore';
import { db } from './firebase-config';
import { collection} from 'firebase/firestore';
import { Link } from 'react-router-dom';
//import { toast } from 'react-toastify';


export default function AccountHandlingForEmployers() {
    const [opacity,setopacity] = useState(0);
    const [opp,setopp] = useState(1);
    const [color,setcolor] = useState('transparent');
    function OpenDashboard(){
        setopacity(prevOpacity=>(prevOpacity === 1 ? 0 : 1));
        setopp(prevOpp=>(prevOpp === 1 ? 0 : 1));
        setcolor(prevColor=>(prevColor === 'rgba(217, 217, 217, 0.18)'?'transparent':'rgba(217, 217, 217, 0.18)'));
    }
        
            


    

    const [details,SetDetails] = useState([]);

    useEffect(()=>{
    async function BringData(){
        console.log("Fetching data from Firestore...");
        const q = query(collection(db, 'EmployerAccountDetails'), where('usingEmail', '==', `${auth.currentUser.email}`));
        console.log("current Email",`${auth.currentUser.email}`)
        const querySnapshot = await getDocs(q);
        console.log("Snapshot:" , querySnapshot);
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("datalist:" , dataList)
        SetDetails(dataList);
    }
    BringData();
},[]);

  return (
    <div>
        <div className='AccountEmployerMain'>
            <div className='dashboard' style={{backgroundColor:color}}>
            <Link to="/PostAJob"><div className='dashButton1'><FontAwesomeIcon className='list-icon' icon={faPlus} /></div></Link>
            <div className='dashButton2'><FontAwesomeIcon className='list-icon' icon={faBookOpen} /></div>
            <div className='dashButton3'><FontAwesomeIcon className='list-icon' icon={faPenToSquare} /></div>
            <div className='dashButton4'><FontAwesomeIcon className='list-icon' icon={faCheckCircle} /></div>
            <div className='short-dashboard' style={{opacity : opp}}></div>
                <Link to="/PostAJob"><button className='Dash-buttons' style={{opacity}}>Post a job</button></Link>
                <button className='Dash-buttons' style={{opacity}}>My listings</button>
                <button className='Dash-buttons'style={{opacity}}>Applications</button>
                <button className='Dash-buttons' style={{opacity}}>Approvals</button>

                {details.map(item=>(
                <div className='logo-company'>
                    <img src={item.pfpURL} className='dasboard-company-logo' alt=''/>
                </div>))}
                {details.map(item=>(
                    <div className='name-company' style={{opacity}}>{item.Company_Name}</div>))}
                    <div className='menu-bar' onClick={OpenDashboard}>
                    <FontAwesomeIcon className='faBars' icon={faBars} /></div>
                    <div className='Dasboard-head' style={{opacity}}>Employer's dashboard</div>
            
            
        </div>
    </div>
    </div>
  )
}
