import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setUser(auth.currentUser)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setUser(auth.currentUser)} />} />
          <Route path="/" element={user ? <Welcome /> : <Login onLogin={() => setUser(auth.currentUser)} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
