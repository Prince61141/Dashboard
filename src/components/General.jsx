import React, { useState, useEffect } from 'react';
import { db, storage, setDoc, getDoc, updateDoc, doc, serverTimestamp, ref, uploadBytes, getDownloadURL } from "../firebaseConfig"; // Ensure the correct path to firebaseConfig
import { getAuth, onAuthStateChanged } from "firebase/auth";

function General() {
  const [firstname, setFirstName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
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
      setFirstName(userData.firstname);
      setDob(userData.dob);
      setGender(userData.gender);
      setProfilePicUrl(userData.profilePicUrl);
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedProfilePicUrl = profilePicUrl;
      if (profilePic) {
        const profilePicRef = ref(storage, `profile/${userId}/${profilePic.name}`);
        await uploadBytes(profilePicRef, profilePic);
        uploadedProfilePicUrl = await getDownloadURL(profilePicRef);
      }

      const userDoc = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDoc);

      const userData = {
        firstname,
        dob,
        gender,
        profilePicUrl: uploadedProfilePicUrl || '',
        timestamp: serverTimestamp()
      };

      if (userDocSnapshot.exists()) {
        await updateDoc(userDoc, userData);
        alert('Data updated successfully!');
      } else {
        await setDoc(userDoc, userData); 
        alert('Data saved successfully!');
      }

      setProfilePic(null);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding document');
    }
  };

  return (
    <div className="form-container">
      <h1>General</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Upload picture of yourself:</label>
          <input type="file" onChange={handleProfilePicChange} accept="image/jpeg, image/png" className='input'/>
        </div>
        <div className='row'>
          <label>Your Name:
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='row' id="row-date">
          <label>DOB: </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='row' id="row-date">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className='input' required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default General;
