// ForgotPassword.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Assuming your custom AuthContext has a `sendPasswordResetEmail` method
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(email);
      setMessage('Check your email for further instructions.');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form id = 'forgotPasswordForm' onSubmit={handleSubmit}>
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
