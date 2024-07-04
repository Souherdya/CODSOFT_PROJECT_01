import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
//import ApplicationForm from './ApplicationForm';
//import ApplicationList from './ApplicationList';
//import AcceptedApplications from './AcceptedApplications';
import Notification from './components/notif';
import LandingPage from './LandingPage';
import AccountPage from './AccountPage';
import SignInForEmployers from './SignInForEmployers';
import SignUpForEmployers from './SignUpForEmplyers';
import WallPage from './WallPage';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import EmployerAccount from './EmployerAccount';
import AccountHandlingForEmployers from './AccountHandlingForEmployers';
import PostAjob from './Post-a-job';


function App() {
    return (
      <Router>

      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/SignInForEmployers' element={<SignInForEmployers/>}/>
      <Route path='/SignUpForEmployers' element={<SignUpForEmployers/>}/>
      <Route path='/EmployerAccount' element={<EmployerAccount/>}/>
      <Route path='/AccountHandling' element={<AccountHandlingForEmployers/>}/>
      <Route path='/PostAJob' element={<PostAjob/>}/>

      <Route path="/Account" element={<AccountPage/>}/>
      <Route path='/Main' element={<WallPage/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/SignIn" element={<SignIn/>}/>

      </Routes>
      <Notification/>
     </Router>
       );
    
}

export default App;
