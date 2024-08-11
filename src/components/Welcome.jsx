import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Welcome() {
  const [selectedSection, setSelectedSection] = useState('general');

  return (
    <div className="welcome">
      <div className="dashboard">
        <Sidebar onSelect={setSelectedSection} />
        <MainContent section={selectedSection} />
      </div>
    </div>
  );
}

export default Welcome;
