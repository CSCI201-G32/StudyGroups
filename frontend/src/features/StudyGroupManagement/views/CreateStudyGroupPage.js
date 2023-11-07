import React, { useState } from 'react';
import StudyGroupForm from '../components/StudyGroupForm/StudyGroupForm';

const CreateStudyGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [meetingTimes, setMeetingTimes] = useState([]);
  const [location, setLocation] = useState('');
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

  const handleLocation = (event) => {
    setLocation(event.target.value);
  }

  const handlePrivacyChange = (privacy) => {
    setPrivacy(privacy);
    if (privacy !== 'PRIVATE') {
      setCode('');
    }
  };

  const handleSubmit = () => {
    const studyGroupData = {
      groupName: groupName,
      courses: courses,
      meetingTimes: meetingTimes,
      location: location,
      privacy: privacy,
      code: privacy === 'PRIVATE' ? code : undefined,
    };
  
    console.log(studyGroupData);
    //sendDataToBackend(studyGroupData);
  };

  return (
    <div>
      <h1>Create Study Group</h1>
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
        onLocationChange={handleLocation}
        privacy={privacy}
        onPrivacyChange={handlePrivacyChange}
        code={code}
        setCode={setCode}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateStudyGroupPage;
