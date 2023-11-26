import React from 'react';
import DayTimeSelection from './DayTimeSelection';
import '../../assets/DayTime.css'; 

const DayTimeComp = ({ meetingTimes, onAddMeetingTime }) => {
  return (
    <div className="day-time-comp">
      <DayTimeSelection onAddSelection={onAddMeetingTime} />

      <div style={{ display: meetingTimes.length === 0 ? 'none' : 'block' }}>
        {meetingTimes.map((meetingTime, index) => (
          <div key={index}>{`${meetingTime.day} at ${meetingTime.time}`}</div>
        ))}
      </div>
    </div>
  );
};

export default DayTimeComp;
