import React from 'react';
import "./register.css";
import { Link } from "react-router-dom";
import { SERVER_URL } from '../../configs/env.config';

export const Register = () => {
  const googleAuth = () => {
    window.open(
      `${SERVER_URL}/auth/google/callback`,
      "_self"
    )
  }

  return (
    <div className="container">
      <h1 className="heading">Sign up Form</h1>
      <div className="form_container">
        <div className="left">
          <img src="./images/logo_ysbk.jpg" alt="logo ysbk" className="img" />
        </div>
        <div className="right">
          <h2 className="form_heading">Create Account</h2>
          <input type="text" className="input" placeholder='Username' />
          <input type="text" className="input" placeholder='Email' />
          <input type="password" className='input' placeholder='Password' />
          <button className="btn">Sign Up</button>
          <p className="text">or</p>
          <button className="google_btn" onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className="text">
            Already have an account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
