import React from 'react';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();

    const handleOnClick= () => {
        navigate('/auth')
      };
  return (
    <header className="layout__header">
      <div className="layout__header-first-img" />
      <p className="layout__header-text">
        Справочник диетолога
      </p>
      <div onClick={handleOnClick} className="layout__header-second-img" />
    </header>
  );
}

export default Header;