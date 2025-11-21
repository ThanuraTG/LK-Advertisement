import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import thanu from '../image/thanu.png';
import './navibar.css';

import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoLanguageOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdOutlineFeedback, MdOutlineSwitchAccount } from "react-icons/md";


export default function Navibar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

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

  const handleHelp = () => {
    alert('Function successfully! but page not created.');
    setShowProfileMenu(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Redirect to All_category_view with keyword
    if (value.trim() !== "") {
      navigate(`/all_category?keyword=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div>
      <nav>
        <div className="navbar-container">    
          <div className="image_logo">
            <a href="/">
              <img src={thanu} alt="Logo" />
            </a>
          </div>
          {/* Navigation Links */}
          <div className="nav-links">
            <a href="/">HOME</a>
            <a href="/all_category">CATEGORY</a>
            <a href="/contact">CONTACT</a>
            <a href="/about">ABOUT</a>
          </div>
          {/* <ul>
            <a href="/">HOME</a>
            <a href="/all_category">CATEGORY</a>
            <a href="/contact">CONTACT</a>
            <a href="/about">ABOUT</a>
          </ul> */}
          {/* Search Bar */}
          <div className="search-container">
            <input type="search" placeholder="Search" />
          </div>

          <div className="user">
            <a href={currentUser ? "/post_add" : "/login"}>
              <button type="button" className="add-post-btn">Add Post</button>
            </a>
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
                    <button onClick={handleHelp}><IoLanguageOutline size={25} />Language : English</button>
                    <button onClick={handleLogout}><MdLogout size={25} />Logout</button>
                    <hr />
                    <button onClick={handleSettings}><IoSettingsOutline size={25} />Settings</button>
                    <hr />
                    <button onClick={handleHelp}><IoIosHelpCircleOutline size={25} />Help</button>
                    <button onClick={handleHelp}><MdOutlineFeedback size={25} />Send feedback</button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
