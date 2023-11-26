import React from 'react';

const DaySelection = ({ day, setDay }) => {
    return (
      <div className="day-selection">
          <select name="days" id="days" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="Mon">Mon</option>
            <option value="Tues">Tues</option>
            <option value="Weds">Weds</option>
            <option value="Thurs">Thurs</option>
            <option value="Fri">Fri</option>
            <option value="Sat">Sat</option>
            <option value="Sun">Sun</option>
          </select>
          </div>
      );
    };
    
export default DaySelection;