import React from 'react';
import DayTimeSelection from './DayTimeSelection';
import '../../assets/study-group/DayTime.css'; 
import MeetingTimes from '../../features/StudyGroupManagement/components/MeetingList'

const DayTimeComp = ({ meetingTimes, onAddMeetingTime, onRemoveMeeting }) => {
  return (
    <div className="day-time-comp">
      <DayTimeSelection onAddSelection={onAddMeetingTime} />

      <MeetingTimes meetingTimes={meetingTimes} onRemoveMeetingTime={onRemoveMeeting}/>
    </div>
  );
};

export default DayTimeComp;
