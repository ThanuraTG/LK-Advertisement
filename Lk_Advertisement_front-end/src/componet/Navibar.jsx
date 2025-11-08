import React, { useState } from 'react';
import './navibar.css';
import thanu from '../image/thanu.png';
import { Link, useNavigate } from 'react-router-dom';
import contact from '../image/contact.jpg';
import { useAuth } from '../context/AuthContext';


import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

export default function Navibar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSettings = () => {
    navigate('/account');
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
    setShowProfileMenu(false);
    navigate('/');
  };
  

  const handlehep = () => {
      alert('Function successfully! but not create page');
      setShowProfileMenu(false);
      // navigate('/login'); // optional
  };
  console.log('Current User:', currentUser);


  return (
    <div>
      <nav>
        <div className="sidebar">
          <div className="image_logo">
            <a href="/">
              <img src={thanu} alt="Logo" />
            </a>
          </div>
          <ul>
            <a href="/">HOME</a>
            <a href="/all_category">CATEGORY</a>
            <a href="/contact">CONTACT</a>
            <a href="/about">ABOUT</a>
          </ul>

          <div className="user">
            {currentUser ? (
              <div className="pro_div">
                <a href="#" onClick={toggleProfileMenu}>
                  <img 
                    src={currentUser.profileImage || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"} 
                    alt="Profile" 
                    className="profile-pic" 
                  />
                </a>

                {showProfileMenu && (
                  <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                    <a href="/account" className="image_pro_1">
                      <img src={currentUser.profileImage || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"} alt="Profile" className='profile-pic' />
                    </a>
                    <p className="profile-name">{currentUser.firstName}</p>
                    <p className="profile-email" >{currentUser.email}</p>
                    
                    <hr />
                    <button onClick={handleSettings}><MdOutlineSwitchAccount size={25} />Switch account</button>
                    <button onClick={handlehep}><IoLanguageOutline size={25} />Language : English</button>
                    <button onClick={handleLogout}><MdLogout size={25} />Logout</button>
                    <hr />
                    <button onClick={handleSettings}><IoSettingsOutline size={25} />Settings</button>
                    <hr />
                    <button onClick={handlehep}><IoIosHelpCircleOutline size={25} />Help</button>
                    <button onClick={handlehep}><MdOutlineFeedback size={25} />Send feedback</button>
                  </div>
                )}
              </div>
              ) : (
                <a href="/login">Login</a>
              )}
          </div>
        </div>

        <div className="second_line_bar">
          <input type="search" placeholder="Search" />
          <a href={currentUser ? "/post_add" : "/login"}>
            <button type="button">Add Post</button>
          </a>
        </div>
      </nav>
    </div>
  );
}





