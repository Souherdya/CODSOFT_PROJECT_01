import React,{useState, useRef ,useEffect} from 'react';
import "./AccountPage.css";
import { auth, storage } from './firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addDoc,collection, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function AccountPage() {
  const navigate = useNavigate(); 
  const UserCollectionRef = collection(db,"UserAccountDetails");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const[Resume,SetResume]=useState(null);
  const [ResumeURL,SetResumeURL] = useState('');

  

  async function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) return;

    try {
      const storageRef = ref(storage, `pfpss/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      setFileUrl(downloadURL);
      console.log("File available at", downloadURL);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
  async function handleResumeUpload(event){
    const resume = event.target.files[0];
    SetResume(resume);
    
    if(!resume){
      toast.error("Resume expected");
    }
    try{
      const storageref = ref(storage, `Resumes/${resume.name}`);
      await uploadBytes(storageref,resume);
      const Url = await getDownloadURL(storageref);
      SetResumeURL(Url)
      console.log("File available at",Url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
    }

    const [formData, setFormData] = useState({
      name: '',
      bio: '',
      email: '',
      contactNo: '',
      location: '',
      recentEmployer: '',
      titlePost: '',
      duration: '',
      degree: '',
      college: '',
      linkedIn: '',
      github: '',
      preferredSector: '',
      preferredTitle: '',
      usingEmail:`${auth.currentUser.email}`
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    // Update formData when pfp changes
   useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      pfpURL: fileUrl,
      ResumeURL: ResumeURL
    }));
  }, [fileUrl,ResumeURL]);

    async function Accountmade(){
    
      try{
        await addDoc(UserCollectionRef,formData);
        console.log("Data Added!");
        toast.success("Account Created!")
        toast.info("Leading you to main page");
        setTimeout(() => {
          navigate("/Main")
        }, 2000);
        
      }
          catch(err){
              console.log(err.messege);
          };
      }


      
    
  

  return (
    <div className='App'>
      <div className='Container'>
      <h1>Set-up your profile</h1>
      <div className="grid-box1">
       
        <div className="pfpForAccount">
          <img className='imgForpfp' src={fileUrl} alt=''/>
        </div>
        <input type='file' className='uploadFileForpfp' onChange={handleFileChange}/>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          className="Candidate-name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio..."
          className="Candidate-bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      <div className="grid-box2">
        <h2>Personal Information</h2>
        <input
          type="text"
          name="email"
          placeholder="Email..."
          className="Candidate-email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No...."
          className="Candidate-no"
          value={formData.contactNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location..."
          className="Candidate-location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="grid-box3">
        <h2>Previous Employment</h2>
        <input
          type="text"
          name="recentEmployer"
          placeholder="Recent employer"
          className="Candidate-email"
          value={formData.recentEmployer}
          onChange={handleChange}
        />
        <input
          type="text"
          name="titlePost"
          placeholder="Title/Post...."
          className="Candidate-no"
          value={formData.titlePost}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration..."
          className="Candidate-location"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      <div className="grid-box4">
        <h2>Education</h2>
        <input
          type="text"
          name="degree"
          placeholder="Degree (with major name)..."
          className="Candidate-email"
          value={formData.degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="college"
          placeholder="College/University...."
          className="Candidate-no"
          value={formData.college}
          onChange={handleChange}
        />
      </div>

      <div className="grid-box5">
        <h2>Socials</h2>
        <input
          type="text"
          name="linkedIn"
          placeholder="LinkedIn..."
          className="Candidate-email"
          value={formData.linkedIn}
          onChange={handleChange}
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub...."
          className="Candidate-no"
          value={formData.github}
          onChange={handleChange}
        />
        <input type="file" className="resumePic" onChange={handleResumeUpload} />
        <button className="resUpload">
          <FontAwesomeIcon className="resIcon" icon={faPlus} />
        </button>
        <p>Upload Resume</p>
      </div>

      <div className="grid-box6">
        <h2>Preferences</h2>
        <input
          type="text"
          name="preferredSector"
          placeholder="Preferred Sector..."
          className="Candidate-email"
          value={formData.preferredSector}
          onChange={handleChange}
        />
        <input
          type="text"
          name="preferredTitle"
          placeholder="Title/Post...."
          className="Candidate-no"
          value={formData.preferredTitle}
          onChange={handleChange}
        />
        <button className='submitAccountDetails' onClick={Accountmade}>Submit</button>
        </div>
      </div>
      
        </div>
  );
}
