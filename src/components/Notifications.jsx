import React from 'react';

function Notifications() {
  return (
    <div className='form-container'>
      <h2>Notifications</h2>
      <form>
        <label>
          Email Notifications:
          <input type="checkbox" name="emailNotifications" defaultChecked />
        </label>
        <br />
        <label>
          SMS Notifications:
          <input type="checkbox" name="smsNotifications" />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Notifications;
