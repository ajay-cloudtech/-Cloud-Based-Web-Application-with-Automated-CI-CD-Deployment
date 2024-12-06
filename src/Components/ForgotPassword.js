// ForgotPassword.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Assuming your custom AuthContext has a `sendPasswordResetEmail` method
import { Link } from 'react-router-dom';

// function for reset password
const ForgotPassword = () => {
  const { sendPasswordResetEmail } = useAuth(); // hook to handle auth
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

   //handler function for reset password form submisison
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(email); //send reset password email to user
      setMessage('Check your email for further instructions.');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
     //html component for reset password form
    <div>
      <h1>Forgot Password</h1>
      <form id = 'forgotPasswordForm' onSubmit={handleSubmit}>
        <p style={{color: 'red', fontSize: '12px'}}> Enter a valid email address to receive password reset link in your inbox</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button id = 'forgotBtn' type="submit">Reset Password</button>
        <br />
        <p id="forgotPasswordPara">
            Remember your password? <Link to="/login">Login</Link>
         </p>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      
    </div>
  );
};

export default ForgotPassword;
