
import React from 'react';
import General from './General';
import Personal from './Personal';
import Professional from './Professional';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';
import Notifications from './Notifications';
import Privacy from './Privacy';

function MainContent({ section }) {
  return (
    <div className="main-content">
      {section === 'general' && <General />}
      {section === 'personal' && <Personal />}
      {section === 'professional' && <Professional />}
      {section === 'change-password' && <ChangePassword />}
      {section === 'change-username' && <ChangeUsername />}
      {section === 'notifications' && <Notifications />}
      {section === 'privacy' && <Privacy />}
    </div>
  );
}

export default MainContent;
