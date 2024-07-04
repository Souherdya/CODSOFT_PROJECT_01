import React,{useState} from 'react';
import { auth, storage } from './firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase-config';
import { addDoc,collection} from 'firebase/firestore';
import { toast } from 'react-toastify';
import "./EmployerAccount.css";
import { Link } from 'react-router-dom';

export default function EmployerAccount() {
    const UserCollectionRef = collection(db,"EmployerAccountDetails");
    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [phone,setphone] = useState('');
    const [compName,setcompName] = useState('');
    const [Website,setwebsite] = useState('');
    const [Address,setAddress] = useState('');
    const [LinkedIn,setLinkedIn] = useState('');
    const [X,setX] = useState('');
    const [FB,setFB] = useState('');
    const [pfp,setpfp] = useState(null);
    const [pfpURL,SetpfpURL] = useState('');
async function HandleData()
{
    if(!name){
        toast.error("Input field!")
      }
      if(!email){
        toast.error("Input field!")
      }
      try{
        await addDoc(UserCollectionRef,{
          Name: name,
          usingEmail:auth.currentUser.email,
          email:email,
          phone: phone,
          Company_Name: compName,
          Company_website: Website,
          Company_Address:Address,
          Company_LinkedIn:LinkedIn,
          CompanyX:X,
          Company_Fb:FB,
          pfpURL: pfpURL
        });
        console.log("Data Added!");
        toast.success("Account Created!")
}
catch(err){
    console.log(err.messege);
};
}

async function handlepfpUpload(event){
    const resume = event.target.files[0];
    setpfp(resume);
    
    if(!resume){
      toast.error("Profile picture expected");
    }
    try{
      const storageref = ref(storage, `Company_pfps/${resume.name}`);
      await uploadBytes(storageref,resume);
      const Url = await getDownloadURL(storageref);
      SetpfpURL(Url)
      console.log("File available at",Url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    }

  return (
    
    <div class="container">
        <div className='profilePic'>
            <div class="profile-picture">
            
                <img src={pfpURL} alt='' className='ppp'/>
                
            </div>
            <input type='file' className='picture' onChange={handlepfpUpload} required/>
            </div>
            
            <Link to="/AccountHandling"><button className='T' onClick={HandleData}>Submit</button></Link>
            <div class="info">
    <div class="contact-info">
        <h3 className='conInf'>Contact Information:</h3>
        <input type="text" className="wallpage-inp" placeholder="Name of the employer" onChange={(e) => setname(e.target.value)} />
        <input type="text" className="wallpage-inp" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
        <input type="text" className="wallpage-inp" placeholder="Phone" onChange={(e) => setphone(e.target.value)} />
    </div>

    <div class="company-info">
        <h3 className='comInf'>Company Information:</h3>
        <input type="text" className="wallpage-inp" placeholder="Company Name" onChange={(e) => setcompName(e.target.value)} required/>
        <input type="text" className="wallpage-inp" placeholder="Company Website" onChange={(e) => setwebsite(e.target.value)} />
        <input type="text" className="wallpage-inp" placeholder="Company Address" onChange={(e) => setAddress(e.target.value)} />
    </div>

    <div class="social-info">
        <h3 className='socInf'>Social media presence (Official):</h3>
        <input type="text" className="wallpage-inp" placeholder="LinkedIn Account" onChange={(e) => setLinkedIn(e.target.value)} />
        <input type="text" className="wallpage-inp" placeholder="X account (optional)" onChange={(e) => setX(e.target.value)} />
        <input type="text" className="wallpage-inp" placeholder="Facebook Account (optional)" onChange={(e) => setFB(e.target.value)} />
    </div>
</div>

        </div>
    
    
   
  )
}
