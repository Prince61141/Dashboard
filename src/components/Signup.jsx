import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignup();
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already exists.");
      }
      else if(error.code === 'auth/weak-password'){
        setError("Weak Password");
      } else {
        setError("SignUp failed! " + error.message);
      }
      setTimeout(() => {
        setError('');
        resetForm();
      }, 5000);
    }
  };

  return (
    <div className='signup'>
      <div className="container">
        <div className="center">
          <h1>Sign Up</h1>
          {error && <div id="error">{error}</div>}
          <form action="" method="POST" onSubmit={handleSignup}>
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
            <input name="submit" type="submit" value="Sign Up" />
            <div className="signup_link">
              Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
