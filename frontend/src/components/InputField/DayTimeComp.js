import React from 'react';
import DayTimeSelection from './DayTimeSelection';
import '../../assets/DayTime.css'; 

const DayTimeComp = ({ meetingTimes, onAddMeetingTime }) => {
  return (
    <div class="day-time-comp">
      <DayTimeSelection onAddSelection={onAddMeetingTime} />

      <div>
        {meetingTimes.map((meetingTime, index) => (
          <div key={index}>{`${meetingTime.day} at ${meetingTime.time}`}</div>
        ))}
      </div>
    </div>
  );
};

export default DayTimeComp;
