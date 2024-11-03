import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLoginChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }
      const data = await response.json();
      // Handle login success
      if (data) { // Check for admin status in response (if applicable)
        localStorage.setItem('user', JSON.stringify({ isAdmin: true })); // Store admin status in localStorage (optional)
      } else {
        localStorage.setItem('user', JSON.stringify({ isAdmin: false }));
      }

      navigate('/');
    } catch (error) {
      alert('Login failed: ' + 'Aдминистратора с таким логином/паролем не существует');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>АВТОРИЗАЦИЯ</h2>
        <div>
          <label htmlFor="login" required>Логин</label>
          <input 
            type="text"
            id="login"
            value={username}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className='form_buttons'>
        <button className='button_auth_vk' type="submit"/>
        <button className='button_auth' type="submit">
          ВОЙТИ
        </button>
        </div>
      </form>
    </div>
  );

}

export default Login;
