import React from 'react';

const TimeSelection = ({ time, setTime }) => {

    return (
      <div class="time-selection">
<input 
          type="time" 
          id="meetinTime" 
          name="meetingTime"
          value={time} onChange={(e) => setTime(e.target.value)}
        />
      </div>
        
      );
    };
    
    export default TimeSelection;