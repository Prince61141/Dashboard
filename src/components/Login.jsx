import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    }
  }, [navigate]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      resetForm();
      navigate('/');
    } 
    catch (error) {
      console.error("Error logging in:", error);
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed! " + error.message);
      }
      setTimeout(() => {
        setError('');
        resetForm();
      }, 5000);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Failed to send password reset email. " + error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='login'>
      <div className="container">
        <div className="center">
          <h1>Login</h1>
          {error && <div id="error">{error}</div>}
          {message && <div id="message">{message}</div>}
          <form onSubmit={handleLogin}>
            <div className="txt_field">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt_field">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span></span>
              <label>Password</label>
            </div>
            <div><p className="pass" onClick={handlePasswordReset}>Forgot Password?</p></div>
            <input type="submit" value="Login" />
            <div className="signup_link">
              Not a Member? <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
        <div className="container__overlay">
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
