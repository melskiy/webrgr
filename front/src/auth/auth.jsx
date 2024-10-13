import React, { useState } from 'react';
import "./auth.css";

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Здесь обычно проверяются учетные данные на сервере
    console.log(`Вход с логином: ${login} и паролем: ${password}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>АВТОРИЗАЦИЯ</h2>
        <div>
          <label htmlFor="login">Логин</label>
          <input 
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='button_auth' type="submit">
          ВОЙТИ
        </button>
      </form>
    </div>
  );

}

export default Login;
