import React from 'react';
import DayTimeSelection from './DayTimeSelection';

const DayTimeComp = ({ meetingTimes, onAddMeetingTime }) => {
  return (
    <div>
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
