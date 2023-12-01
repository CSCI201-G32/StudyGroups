import React from 'react';
import DayTimeSelection from './DayTimeSelection';
import '../../assets/study-group/DayTime.css'; 
import MeetingList from '../../features/StudyGroupManagement/components/MeetingList'

const DayTimeComp = ({ meetingTimes, onAddMeetingTime, onRemoveMeeting }) => {
  return (
    <div className="day-time-comp">
      <DayTimeSelection onAddSelection={onAddMeetingTime} />

      <MeetingList meetingTimes={meetingTimes} onRemoveMeetingTime={onRemoveMeeting}/>
    </div>
  );
};

export default DayTimeComp;
