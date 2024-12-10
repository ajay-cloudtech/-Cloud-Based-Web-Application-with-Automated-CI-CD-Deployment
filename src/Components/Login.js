// Login.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// function for login
const Login = () => {
  const { login } = useAuth(); // hook to handle auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  //handler function for login form submisison
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await login(email, password);
      navigate('/dashboard'); // redirect to dashboard page on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    //html component for login form
    <div>
      <nav id='navBar'>
          <h1 id='heading1'>GradeWise📚</h1>
      </nav>
      <form id='loginForm' onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button id = 'loginBtn' type="submit">Login</button>
        <br />
        <Link to="/forgot-password" id="forgotPasswordLink">Forgot Password?</Link> {/* Forgot Password link */}
        <br />
        <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      </form>
      {error && <p>{error}</p>}
      
    </div>
  );
};

export default Login;
