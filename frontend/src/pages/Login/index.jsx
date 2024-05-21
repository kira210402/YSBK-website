import React from 'react';
import "./login.css";
import { Link } from "react-router-dom";
import { SERVER_URL } from '../../configs/env.config';

export const Login = () => {
  const googleAuth = () => {
    window.open(
      `${SERVER_URL}/auth/google/callback`,
      "_self"
    )
  }
  return (
    <div className="container">
      <h1 className="heading">Log in Form</h1>
      <div className="form_container">
        <div className="left">
          <img src="./images/logo_ysbk.jpg" alt="logo ysbk" className="img" />
        </div>
        <div className="right">
          <h2 className="form_heading">Members Log in</h2>
          <input type="text" className="input" placeholder='Email' />
          <input type="password" className='input' placeholder='Password' />
          <button className="btn">Log In</button>
          <p className="text">or</p>
          <button className="google_btn" onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign in with Google</span>
          </button>
          <p className="text">
            New here ? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
