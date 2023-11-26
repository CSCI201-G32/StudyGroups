import React, { useState } from 'react';
import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import '../../assets/DayTime.css'; 

const DayTimeSelection = ({ onAddSelection }) => { 
  const [day, setDay] = useState('Mon');
  const [time, setTime] = useState('');

  const handleAddMeetingTime = () => {
    if (day && time) {
      onAddSelection(day, time); 
      setDay('Mon');
      setTime('');
    }
  };

  return (
    <div class="day-time-selection">
      <DaySelection day={day} setDay={setDay} />
      <TimeSelection time={time} setTime={setTime} />
      <button type="button" onClick={handleAddMeetingTime}>Add Day & Time</button>
    </div>
  );
};

export default DayTimeSelection;
