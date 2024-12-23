import React, { useState ,  useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

/**
 * Компонент авторизации, обеспечивающий вход через форму и VK ID
 * @component
 * @returns {JSX.Element} Форма авторизации
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Обработчик ошибок авторизации через VK ID
   * @param {Error} error - Объект ошибки
   */
  const vkidOnError = (error) => {
    console.error('VK ID Error:', error);
  };

  /**
   * Обработчик успешной авторизации через VK ID
   * @param {Object} data - Данные пользователя от VK ID
   */
  const vkidOnSuccess = async (data) => {
    const data_login = data
    console.log( data_login["user_id"])
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username : String(data_login["user_id"]),  password: String(data["user_id"])}),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }
      const data_auth = await response.json();
      // Handle login success
      if (data_auth) { // Check for admin status in response (if applicable)
        localStorage.setItem('user', JSON.stringify({ isAdmin: true })); // Store admin status in localStorage (optional)
      } else {
        localStorage.setItem('user', JSON.stringify({ isAdmin: false }));
      }

      navigate('/');
    } catch (error) {
      console.log(error)
      alert('Login failed: ' + 'Aдминистратора с таким логином/паролем не существует');
    }
    
  };

  /**
   * Эффект для загрузки и инициализации SDK VK ID
   */
  useEffect(() => {
    const loadVKIDSDK = () => {
      if (document.getElementById('vk-sdk-script')) {
        return;
      }
  
      const script = document.createElement('script');
      script.id = 'vk-sdk-script';
      script.src = "https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js";
      script.onload = () => {
        if ('VKIDSDK' in window) {
          const VKID = window.VKIDSDK;
  
          VKID.Config.init({
            app: 52852292,
            redirectUrl: 'https://localhost',
            responseMode: VKID.ConfigResponseMode.Callback,
            source: VKID.ConfigSource.LOWCODE,
            scope: '', 
          });
  
          const container = document.getElementById('vkid-container');
          if (container) {
            container.innerHTML = '';
          }
  
          const oneTap = new VKID.OneTap();
          oneTap.render({
            container: container,
            showAlternativeLogin: true,
          })
          .on(VKID.WidgetEvents.ERROR, vkidOnError)
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
            console.log('VK ID Login Payload:', payload);
            const code = payload.code;
            const deviceId = payload.device_id;
            
            // Логируем полученный код и device_id
            console.log('Authorization Code:', code);
            console.log('Device ID:', deviceId);
            
            VKID.Auth.exchangeCode(code, deviceId)
              .then((response) => {
                console.log('Token Exchange Response:', response);
                vkidOnSuccess(response);
              })
              .catch(vkidOnError);
          });
        }
      };
      document.body.appendChild(script);
    };
  
    loadVKIDSDK();
  
    return () => {
      const script = document.getElementById('vk-sdk-script');
      if (script) {
        script.remove();
      }
    };
  }, []);
  

  /**
   * Обработчик изменения поля логина
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  const handleLoginChange = (event) => {
    setUsername(event.target.value);
  };

  /**
   * Обработчик изменения поля пароля
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   * Обработчик отправки формы авторизации
   * @param {React.FormEvent<HTMLFormElement>} e 
   */
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

      <button id="vkid-container" className='button_auth_vk'></button>

        <button className='button_auth' type="submit">
          ВОЙТИ
        </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
