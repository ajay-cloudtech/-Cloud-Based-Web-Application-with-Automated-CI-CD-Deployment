// Signup.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await signup(email, password);
      setSuccess(true); // Set success to true on successful signup
      // Optionally navigate to login after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful signup
      }, 3000); // Wait for 3 seconds before redirecting
    } catch (error) {
      setError(error.message);
      setSuccess(false); // Reset success state on error
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {success ? (
        <div>
          <p>Signup successful! You can now log in.</p>
          <Link to="/login">Go to Login</Link> {/* Link to navigate to login */}
        </div>
      ) : (
        <form id = 'signup' onSubmit={handleSubmit}>
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
          <button type="submit">Signup</button>
          {error && <p>{error}</p>}
        </form>
      )}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;