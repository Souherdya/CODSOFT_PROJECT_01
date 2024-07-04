import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import "./ApplicationForm";
import { collection, doc, getDocs,updateDoc } from 'firebase/firestore';

function ApplicationList() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const snapshot = await getDocs(collection(db,"Roles"))
            const docsRef = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id

            })) 
            setApplications(docsRef);
            
        }
        fetchApplications();
    }, []);

    

    const handleAccept = async (id) => {
        await updateDoc(doc(db,"Roles",id),
        { "status" : "accepted" });
    };

    const handleReject = async (id) => {
        await updateDoc(doc(db,"Roles",id),
        { "status" : "rejected" });
    };

    return (
        <div>
            <h2>Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        {app.email} applied for  {app.role}
                        <button className="accept" onClick={() => handleAccept(app.id)}>Accept</button>
                        <button className="reject" onClick={() => handleReject(app.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ApplicationList;