import React, { useState } from 'react';
import StudyGroupForm from '../components/StudyGroupForm/StudyGroupForm';

const CreateStudyGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [meetingTimes, setMeetingTimes] = useState([]);
  const [location, setLocation] = useState('ONLINE'); // default to ONLINE
  const [privacy, setPrivacy] = useState('PUBLIC');
  const [code, setCode] = useState('');

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  }

  const handleCourseInputChange = (event) => {
    setNewCourse(event.target.value);
  };

  const handleAddCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };

  const handleAddMeetingTime = (day, time) => {
    setMeetingTimes(prevMeetingTimes => [
      ...prevMeetingTimes,
      { day, time }
    ]);
  };

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value);
    if (event.target.value !== 'PRIVATE') {
      setCode('');
    }
  };

  const handleSubmit = () => {
    // submit logic
  };

  return (
    <div>
      <p>Create Group</p>
      <StudyGroupForm
        groupName={groupName}
        onGroupNameChange={handleGroupNameChange}
        courses={courses}
        onCourseInputChange={handleCourseInputChange}
        onAddCourse={handleAddCourse}
        newCourse={newCourse}
        meetingTimes={meetingTimes}
        onAddMeetingTime={handleAddMeetingTime}
        location={location}
        setLocation={setLocation}
        privacy={privacy}
        handlePrivacyChange={handlePrivacyChange}
        code={code}
        setCode={setCode}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateStudyGroupPage;
