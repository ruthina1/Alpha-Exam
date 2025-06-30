import '../styles/payment.css';
import logo from '../images/logo.jpg';
import upload from '../images/upload.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewURL, setPreviewURL] = useState(upload);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);

  const isFormValid =
    username.trim() !== '' &&
    password.trim().length >= 6 &&
    confirm.trim().length >= 6 &&
    password === confirm &&
    uploadedFile;

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewURL(imageUrl);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const selectedSemesters = location.state?.selectedSemesters || {}; 

  const handleSignUp = async () => {
    if (!username || !password || !confirm || !uploadedFile) {
      setError(true);
      setErrorMessage('Please fill all fields and upload the screenshot.');
      navigate('/Thankyou');
      return;
    }

    if (password.length < 6 || confirm.length < 6) {
      setError(true);
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      setError(true);
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('http:///register api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          selectedSemesters, 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        
      } else {
        setError(true);
        setErrorMessage(result.message || 'Registration failed.');
      }
    } catch (err) {
      setError(true);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="containerP">
      <div className="payment-container">
        <img src={logo} className="logo" alt="Logo" />
        <h2>Welcome</h2>
        <div className="under">
          {/* Left Form */}
          <div className="left">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`txt ${error ? 'error-border' : ''}`}
                  placeholder=""
                />
                <label htmlFor="username">Username</label>
              </div>

              <br />

              <div className="row">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`txt ${error ? 'error-border' : ''}`}
                  placeholder=""
                />
                <label htmlFor="password">Password</label>
              </div>

              <br />

              <div className="row">
                <input
                  type="password"
                  name="confirm"
                  id="confirm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`txt ${error ? 'error-border' : ''}`}
                  placeholder=""
                />
                <label htmlFor="confirm">Confirm</label>
              </div>
            </form>

            {errorMessage && (
              <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
            )}
          </div>

          {/* Right Side: Image Upload */}
          <div className="right">
            <h3>Pay</h3>
            Account number <br />
            1000591743728 <br /> <br />

            <img
              src={previewURL}
              alt="Click to upload"
              className="preview-img"
              onClick={handleImageClick}
              style={{
                cursor: 'pointer',
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

            <p>Please upload the screenshot of the bank statement.</p>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          className={`signupbtn ${isFormValid ? 'enabled' : ''}`}
          disabled={!isFormValid}
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        <Link to="/Login" style={{ color: '#44E5B2' }}>Login</Link>

        <p className="last">
          For any issue <span style={{ color: 'blue' }}>contact Us</span> at working hour.
        </p>
      </div>
    </div>
  );
}
