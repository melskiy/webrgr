import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const handleOnClick = () => {
    
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).isAdmin) {
      setShowLogoutButton(true);
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutButton(false);
  };

  return (
    <header className="layout__header">
      <div className="layout__header-first-img" />
      <p className="layout__header-text">
        Справочник диетолога
      </p>
      <div onClick={handleOnClick} className="layout__header-second-img">
        {showLogoutButton ? (
          <button className = 'logout_button' onClick={handleLogout}>Выйти</button>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;