import React from 'react';
import "./homePage.css";

export const HomePage = (userDetails) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(`http://localhost:8000/auth/logout`, "_self");
  }
  return (
    <div className="container">
      <h1 className="heading">HOME</h1>
      <img src={user.picture} alt="profile" className="profile_img" />
      <p className="text">{user.name}</p>
      <p className="text">{user.email}</p>
      <button className="btn" onClick={logout}>Log out</button>
    </div>
  )
}
