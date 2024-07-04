import React from 'react'
import { db } from './firebase-config';
import { auth } from './firebase-config';
import { useState,useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import "./post-a-job.css"
import { addDoc,updateDoc,doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query } from 'firebase/firestore';
import { collection,where } from 'firebase/firestore';

export default function PostAjob() {
  
  const [pfp,setpfp] = useState('');

  try{
    async function Bringpfp(){
        console.log("Fetching data from Firestore...");
        const q = query(collection(db, 'EmployerAccountDetails'), where('usingEmail', '==', `${auth.currentUser.email}`));
       
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map(doc=>({...doc.data()}));
       
        const fieldValue = queryData.length > 0 ? queryData[0].pfpURL : undefined;
        
        setpfp(fieldValue);
        console.log("pfp: ",pfp)

    }
    Bringpfp();}
    catch{};

  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    companyLocation: '',
    companyWebsite: '',
    sectorIndustry: '',
    jobTitle: '',
    departmentTeam: '',
    jobLocation: '',
    remoteOption: false,
    education: '',
    experience: '',
    skills: '',
    applicationDeadline: '',
    contactInfo: '',
    salaryRange: '',
    usingEmail:`${auth.currentUser.email}`,
    pfpURL:''
  });
 
   // Update formData when pfp changes
   useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      pfpURL: pfp
    }));
  }, [pfp]);

  console.log("pfp: ", pfp);
  console.log("formData: ", formData);

  const navigate = useNavigate();
  const collectionRef= collection(db,"job_card_info");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

    async function HandleSubmit(e){
    e.preventDefault();
    await addDoc(collectionRef,formData)
      .then(() => {
        console.log('Job opportunity successfully submitted!');
        toast.success("Your Job Post has been submitted!");
        
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    }
      
  

  return (
    <form onSubmit={HandleSubmit}>
      <h2>Job Opportunity Form</h2>
      <div className='Company-information'>
        <h4>Company Information</h4>
        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" className="job-postInput" value={formData.companyName} onChange={handleChange} required/>

        <label htmlFor="companyDescription">Company Description:</label>
        <textarea id="companyDescription" name="companyDescription" className="job-postInput" rows="4" value={formData.companyDescription} onChange={handleChange}></textarea>

        <label htmlFor="companyLocation">Company Location:</label>
        <input type="text" id="companyLocation" name="companyLocation" className="job-postInput" value={formData.companyLocation} onChange={handleChange} />

        <label htmlFor="companyWebsite">Company Website:</label>
        <input type="url" id="companyWebsite" name="companyWebsite" className="job-postInput" value={formData.companyWebsite} onChange={handleChange} />

        <label htmlFor="sectorIndustry">Sector/Industry:</label>
        <input type="text" id="sectorIndustry" name="sectorIndustry" className="job-postInput" value={formData.sectorIndustry} onChange={handleChange}/>
      </div>

      <div className='position-details'>
        <h4>Job Position Details</h4>
        
        <label htmlFor="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" name="jobTitle" className="job-postInput" value={formData.jobTitle} onChange={handleChange} required/>

        <label htmlFor="departmentTeam">Department/Team:</label>
        <input type="text" id="departmentTeam" name="departmentTeam" className="job-postInput" value={formData.departmentTeam} onChange={handleChange} />

        <label htmlFor="jobLocation">Job Location:</label>
        <input type="text" id="jobLocation" name="jobLocation" className="job-postInput" value={formData.jobLocation} onChange={handleChange} />

        <label>
          <input type="checkbox" id="remoteOption" name="remoteOption" checked={formData.remoteOption} onChange={handleChange}/> Remote Work Option
        </label>


          <input type='file' className='image-input-for-jobPost'/>
        
      </div>

      <h4>Required Qualifications</h4>
      <label htmlFor="education">Education:</label>
      <input type="text" id="education" name="education" className="job-postInput" value={formData.education} onChange={handleChange}/>

      <label htmlFor="experience">Experience:</label>
      <input type="text" id="experience" name="experience" className="job-postInput" value={formData.experience} onChange={handleChange} />

      <label htmlFor="skills">Skills:</label>
      <input type="text" id="skills" name="skills" className="job-postInput" value={formData.skills} onChange={handleChange} required/>

      <h4>Application Process</h4>
      <label htmlFor="applicationDeadline">Application Deadline:</label>
      <input type="date" id="applicationDeadline" name="applicationDeadline" className="job-postInput" value={formData.applicationDeadline} onChange={handleChange}/>

      <label htmlFor="contactInfo">Contact Information for Queries:</label>
      <input type="text" id="contactInfo" name="contactInfo" placeholder='Email/Phone' className="job-postInput" value={formData.contactInfo} onChange={handleChange} />

      <label htmlFor="salaryRange">Expected Salary Range:</label>
      <input type="text" id="salaryRange" name="salaryRange" placeholder="Negotiable according to skillsets and experience" className="job-postInput" value={formData.salaryRange} onChange={handleChange} />

      <button type="submit" className='submitButton'>POST</button>
    </form>
  );
};


