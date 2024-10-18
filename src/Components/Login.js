// Login.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth(); // No need to use setCurrentUser
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await login(email, password); // Login and Firebase will manage user state

      navigate('/dashboard'); // Navigate to dashboard upon successful login
    } catch (error) {
      setError(error.message); // Show error if login fails
    }
  };

  return (
    <div>
        <nav id='navBar'>
            <h1 id='heading1'>Grade<span style={{ color: '#e1f013' }}>Wise</span></h1>
        </nav>
      <h1>Login</h1>
      <form id='loginForm' onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p id="loginPara">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
