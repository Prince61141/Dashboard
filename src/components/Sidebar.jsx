import React, { useState, useEffect } from 'react';
import { db, getDoc, doc } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import '../App.css';
import { Link } from 'react-router-dom';

function Sidebar({ onSelect }) {
  const [profilePicUrl, setProfilePicUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfilePicUrl(userDoc.data().profilePicUrl);
        }
      }
    };
    fetchData();
  }, []);
  

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="sidebar">
      <div className='profile'>
        <img src={profilePicUrl || "src/assets/image.png"} alt='Profile' />
      </div>
      <ul>
        <li><a onClick={() => onSelect('general')}>General</a></li>
        <li><a onClick={() => onSelect('personal')}>Personal</a></li>
        <li><a onClick={() => onSelect('professional')}>Professional</a></li>
        <li><a onClick={() => onSelect('change-password')}>Change Password</a></li>
        <li><a onClick={() => onSelect('change-username')}>Change Username</a></li>
        <li><a onClick={() => onSelect('notifications')}>Notifications</a></li>
        <li><a onClick={() => onSelect('privacy')}>Privacy</a></li>
        <li><a onClick={handleLogout}>Logout</a></li> {/* Added Logout */}
      </ul>
    </div>
  );
}

export default Sidebar;