import React, { useState, useEffect } from 'react';
import { db, setDoc, getDoc, updateDoc, doc } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Professional() {
  const [institution, setInstitution] = useState('');
  const [major, setMajor] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchData(user.uid);
      }
    });
  }, []);

  const fetchData = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setInstitution(userData.institution || '');
      setMajor(userData.major || '');
      setGradYear(userData.gradYear || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDoc);

      const userData = {
        institution,
        major,
        gradYear,
      };

      if (userDocSnapshot.exists()) {
        await updateDoc(userDoc, userData);
        alert('Data updated successfully!');
      } else {
        await setDoc(userDoc, userData); 
        alert('Data saved successfully!');
      }

    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding document');
    }
  };

  return (
    <div className="form-container">
      <h1>Professional Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>
            Institution:
            <input type="text" name="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            Major:
            <input type="text" name="major" value={major} onChange={(e) => setMajor(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            Graduation Year:
            <input type="text" name="gradYear" value={gradYear} onChange={(e) => setGradYear(e.target.value)} required/>
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Professional;
