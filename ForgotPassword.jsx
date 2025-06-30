import '../styles/forgotPassword.css';
import logo from '../images/logo.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!username.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('https://your-backend.com/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Your password has been updated successfully.');
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        if (data.message === 'User not found') {
          setError('Incorrect username.');
        } else {
          setError(data.message || 'Failed to reset password.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="row">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`txt ${error && error.includes('username') ? 'error-border' : ''}`}
              placeholder=""
            />
            <label htmlFor="username">Username</label>
          </div>

          <br />

          <div className="row">
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`txt ${error && error.includes('Password') ? 'error-border' : ''}`}
              placeholder=""
            />
            <label htmlFor="newPassword">New Password</label>
          </div>

          <br />

          <div className="row">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`txt ${error && error.includes('match') ? 'error-border' : ''}`}
              placeholder=""
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>

        <Link to="/Login" className="back-link">
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
