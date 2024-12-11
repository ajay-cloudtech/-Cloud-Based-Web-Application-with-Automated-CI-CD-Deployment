import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

//function for signup
const Signup = () => {
  const { signup } = useAuth(); //hook to handle auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState(''); // new state for access code
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate(); 

  const VALID_ACCESS_CODE = 'TrustedFaculty2024'; // predefined valid access code

  // handler function for signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (accessCode !== VALID_ACCESS_CODE) { // validate access code
      setError('Invalid access code');
      return;
    }

    try {
      await signup(email, password);
      setSuccess(true); 
      setTimeout(() => {
        navigate('/login'); // redirect to login page after successful signup
      }, 3000); 
    } catch (error) {
      setError(error.message);
      setSuccess(false); 
    }
  };

  return (
    //html component for signup form
    <div>
       <nav id='navBar'>
          <h1 id='heading1'>GradeWise📚</h1>
      </nav>
      {success ? (
        <div>
          <p>Signup successful! You can now log in.</p>
          <Link to="/login">Go to Login</Link> 
        </div>
      ) : (
        <form id='signup' onSubmit={handleSubmit}>
          <h2>Signup</h2>
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
          <input
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Access Code"
            required
          />
          <button id='signupBtn' type="submit">Signup</button>
          <br />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {error && <p>{error}</p>}
        </form>
      )}
      
    </div>
  );
};

export default Signup;
