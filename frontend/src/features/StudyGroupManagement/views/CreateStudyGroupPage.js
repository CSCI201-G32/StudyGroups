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
  
    console.log(JSON.stringify(studyGroupData, null, 2));
    sendDataToBackend(studyGroupData);
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

function sendDataToBackend(studyGroupData){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("sent data success");
        }
    };
    
    var queryString = "StudyGroupCreateServlet?groupName=" + encodeURIComponent(studyGroupData.groupName) + 
                  "&courses=" + encodeURIComponent(studyGroupData.courses.join(',')) + 
                  "&meetingTimes=" + encodeURIComponent(studyGroupData.meetingTimes.join(',')) + 
                  "&location=" + encodeURIComponent(studyGroupData.location) + 
                  "&privacy=" + encodeURIComponent(studyGroupData.privacy) + 
                  (studyGroupData.code ? "&code=" + encodeURIComponent(studyGroupData.code) : "");

    console.log("Final URL being requested:", queryString);

    xhttp.open("GET", queryString, true);
    xhttp.send();
}

export default CreateStudyGroupPage;
