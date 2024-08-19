import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IconLogout, IconBell, IconSettings } from "@tabler/icons-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      setIsLoggedIn(true)
    }
  },[])

  return (
    <div className={`navbar-container ${isLoggedIn ? "dark-background" : ""}`}>
      <div className="comapany-logo">
        <span className="comapany-logo-highlight">Ques.</span>AI
      </div>
      <div className="icons">
        <IconBell stroke={2} />
        {isLoggedIn ? (
          <div className="icon">
            <IconSettings stroke={2} />
            <IconLogout stroke={2} onClick={handleLogout}/>
          </div>
        ) : (
          <div className="icon">
            <IconSettings stroke={2} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
