import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import image from '../Navbar/directright.png';
import bell from '../Navbar/notifications.svg';
import settingIcon from '../Navbar/icon.svg';
import downloadIcon from '../Navbar/download.png';

const Navbar = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setLoggedIn(false); // Update authentication state in parent component
    navigate('/'); // Redirect to login page or other appropriate action
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className={`navbar-container ${isLoggedIn ? 'dark-background' : ''}`}>
       <div className="comapany-logo"><span className="comapany-logo-highlight">Ques.</span>AI</div>
      <div className='icons'>
        <div className='icon'>
          <img src={bell} alt="Notifications" />
        </div>
        {isLoggedIn ? (
          <div className='icon' onClick={handleSettingsClick}>
            <span className="user-email">{userEmail}</span>
            <img src={settingIcon} alt="Settings" />
            <img src={downloadIcon} alt="Download" />
          </div>
        ) : (
          <div className='icon' onClick={handleSettingsClick}>
            <img src={settingIcon} alt="Settings" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
