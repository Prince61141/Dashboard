import React, { useState, useEffect } from 'react';
import { db, updateDoc, doc } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ChangeUsername() {
  const [newUsername, setNewUsername] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { username: newUsername });
      alert('Username updated successfully!');
    } catch (error) {
      console.error('Error updating username: ', error);
      alert('Error updating username');
    }
  };

  return (
    <div className="form-container">
      <h1>Change Username</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
        <label>
          New Username:
          <input
            type="text"
            name="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </label>
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
}

export default ChangeUsername;
