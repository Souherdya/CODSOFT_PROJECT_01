import React from 'react'
import "./LandingPage.css"
import { Link } from 'react-router-dom'
export default function LandingPage() {
  return (
    <div className='App'>
      <div className='main'>
      <Link to="/SignInForEmployers"><button className='hire'>Employers / Post a job</button></Link>
      <h1 className='flaunt'>flaunt</h1>
      <h2 className='skills'>YOUR SKILLS AND GET HIRED WITH EASE</h2>
      <Link to="/SignIn"><div className='button'>Explore</div></Link>
      </div>
      <h1>Services</h1>
      <h2>we provide,</h2>
    </div>
  )
}
