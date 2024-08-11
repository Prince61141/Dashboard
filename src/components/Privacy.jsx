// src/components/Privacy.js
import React from 'react';

function Privacy() {
  return (
    <div className='form-container'>
      <h2>Privacy Information</h2>
      <form>
        <label>
          Profile Visibility:
          </label>
          <select name="profileVisibility" defaultValue="public">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        
        <br />
        <label>
          Search Engine Indexing:
          <input type="checkbox" name="searchIndexing" />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Privacy;
