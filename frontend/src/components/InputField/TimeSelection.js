import React from 'react';

const TimeSelection = ({ time, setTime }) => {

    return (
        <input 
          type="time" 
          id="meetinTime" 
          name="meetingTime"
          value={time} onChange={(e) => setTime(e.target.value)}
        />
      );
    };
    
    export default TimeSelection;