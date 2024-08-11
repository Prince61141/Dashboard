import React, { useState, useEffect } from 'react';
import { db, setDoc, getDoc, updateDoc, doc } from "../firebaseConfig"; // Ensure the correct path to firebaseConfig
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Personal() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [nearby, setNearby] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);
        fetchData(user.uid);
      }
    });
  }, []);

  const fetchData = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setPhone(userData.phone);
      setStreet(userData.street);
      setNearby(userData.nearby);
      setState(userData.state);
      setCountry(userData.country);
      setPostalCode(userData.postalcode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDoc);

      const userData = {
        firstname,
        lastname,
        phone,
        email,
        street,
        nearby,
        state,
        country,
        postalcode
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
      <h1>Personal</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>
            First Name:
            <input type="text" name="firstName" value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            Email:
            <input type="email" name="email" value={email} readOnly/>
          </label>
          <label>
            Phone Number:
            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            Street Address:
            <input type="text" name="streetAddress" value={street} onChange={(e) => setStreet(e.target.value)} required/>
          </label>
          <label>
            Near By:
            <input type="text" name="streetAddress2"value={nearby} onChange={(e) => setNearby(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            State/Province:
            <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} required/>
          </label>
          <label>
            Country:
            <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required/>
          </label>
        </div>
        <div className="row">
          <label>
            Post/Zip Code:
            <input type="text" name="postalCode" value={postalcode} onChange={(e) => setPostalCode(e.target.value)} required/>
          </label>
         
        </div>
        <label className="form-checkbox">
          <input type="checkbox" name="terms" />
          I agree to the defined <a href="#">terms, conditions, and policies</a>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Personal;
