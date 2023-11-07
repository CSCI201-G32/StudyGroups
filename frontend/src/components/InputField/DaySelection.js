import React from 'react';

const DaySelection = ({ day, setDay }) => {
    return (
          <select name="days" id="days" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="monday">Mon</option>
            <option value="tuesday">Tues</option>
            <option value="wednesday">Weds</option>
            <option value="thursday">Thurs</option>
            <option value="friday">Fri</option>
            <option value="saturday">Sat</option>
            <option value="sunday">Sun</option>
          </select>
      );
    };
    
export default DaySelection;