import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';

function AcceptedApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchAcceptedApplications = async () => {
            const snapshot = await db.collection('applications').where('status', '==', 'accepted').get();
            setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchAcceptedApplications();
    }, []);

    return (
        <div>
            <h2>Accepted Applications</h2>
            <ul>
                {applications.map(app => (
                    <li key={app.id}>
                        {app.email} - {app.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AcceptedApplications;