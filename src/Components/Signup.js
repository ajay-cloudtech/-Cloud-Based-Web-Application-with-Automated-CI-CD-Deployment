import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

//function for signup
const Signup = () => {
  const { signup } = useAuth(); //hook to handle auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate(); 

  // handler function for signup form submisison
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
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
        <form id = 'signup' onSubmit={handleSubmit}>
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
          <button id = 'signupBtn' type="submit">Signup</button>
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