import React, { useEffect, useState,useRef } from 'react';
import { auth,db } from './firebase-config';
import { collection,where } from 'firebase/firestore';
import "./WallPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { query } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
export default function WallPage() {
const [details,SetDetails] = useState([]);
const [jobDetails,setjobDetails] = useState([]);
const [h2,seth2] = useState('');

    const collectionRef = collection(db,"job_card_info")
    useEffect(()=>{
    async function BringData(){
        console.log("Fetching data from Firestore...");
        const q = query(collection(db, 'UserAccountDetails'), where('usingEmail', '==', `${auth.currentUser.email}`));

        const querySnapshot = await getDocs(q);
        
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("datalist:" , dataList)
        SetDetails(dataList);
    }
    BringData();
},[]);

useEffect(() => {
    const fetchApplications = async () => {
        console.log("Fetching data from Firestore...");
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        
        const docsRef = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id

        })) 
        setjobDetails(docsRef);
        
    }
    fetchApplications();
}, []);


    const h2Ref = useRef(null);
  
    // Function to handle button click
    const handleButtonClick = () => {
      // Access the innerHTML of the h2 element
      const h2Value = h2Ref.current.innerHTML;
      console.log("H2VAlue:",h2Value);
      
      seth2(h2Value);
      toast.success("Application Submitted!")
      
    };



    
  return (
   
    <div class="ciontainer">
    <script src="https://kit.fontawesome.com/5bfdb4f374.js" crossorigin="anonymous"></script>
    <div class="left-panel">
    {details.map(item=>(
        <div class="profile-pic" key={item.id}>
            <img alt='' src={item.pfpURL} className="wallPFP"/>
        </div>))}
        {details.map(item=>(
        <div class="designation" key={item.id}>
            <p className='D'>{item.bio}</p>
        </div>))}
        {details.map(item=>(
       <div class="Name" key={item.id}>
        <h3>{item.name}</h3>
        </div>))}
    </div>
    <div class="main-content">
        <input type="text" class="search-bar" placeholder="SEARCH..."/>
        <div class="filter">
        <FontAwesomeIcon icon={faFilter} />
        </div>
        
            {jobDetails.map(item=>(
                <ul>
                <li>
        <div class="job-card" key={item.id}>
        
      
            <div class="logo">
                <img src={item.pfpURL} className='logo-for-jobcard'/>
            </div>
        
            <div class="details">
                <h1 ref={h2Ref}>{item.companyName}</h1>
                <p class="L">looking for...</p>
                <p class="job">{item.jobTitle}</p>
            </div>
            <div class="actions">
                <button class="explore">Explore</button>
                <button class="apply" onClick={handleButtonClick}>Apply</button>
            </div>
        </div>
        </li>
        </ul>
    ))}
    </div>
    <div class="right-panel">
       <h1>Notification           </h1>

        <div class="notif">
            <div class="logo"></div>
            <p>SouherdyaSarkar Inc. Has accepted your application!</p>
        </div>
    </div>
</div>
  )
}
