import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      // Salva os dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({ username, password }));
      navigate('/app/dashboard'); // Redireciona para o dashboard após login
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>Login</h2>
        <span>
          <FaUser className={styles.icone}/>
          <input 
            type="text" 
            placeholder="Nome de usuário" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </span>
        <span>
          <RiLockPasswordFill className={styles.icone}/>
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          </span>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;

