import React, {useState} from 'react';
import StudyGroupForm from '../components/StudyGroupForm/StudyGroupForm';
import {useNavigate} from 'react-router-dom';

const CreateStudyGroupPage = () => {
    const [groupName,
        setGroupName] = useState('');
    const [courses,
        setCourses] = useState([]);
    const [newCourse,
        setNewCourse] = useState('');
    const [meetingTimes,
        setMeetingTimes] = useState([]);
    const [location,
        setLocation] = useState('');
    const [privacy,
        setPrivacy] = useState('PUBLIC');
    const [code,
        setCode] = useState('');
    const navigate = useNavigate();

    const handleGroupNameChange = (event) => {
        // Replace spaces with an empty string
        const newValue = event
            .target
            .value
            .replace(/\s/g, '');
        setGroupName(newValue);
    };

    const handleCourseInputChange = (event) => {
        const newValue = event
            .target
            .value
            .toUpperCase()
            .replace(/\s/g, '');
        setNewCourse(newValue);
    };

    const handleAddCourse = () => {
        if (newCourse) {
            setCourses([
                ...courses,
                newCourse
            ]);
            setNewCourse('');
        }
    };

    const handleAddMeetingTime = (day, time) => {
        setMeetingTimes(prevMeetingTimes => [
            ...prevMeetingTimes, {
                day,
                time
            }
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
            code: privacy === 'PRIVATE'
                ? code
                : undefined
        };

        
        console.log(JSON.stringify(studyGroupData, null, 2));
        sendDataToBackend(studyGroupData, () => {
            navigate(`/${studyGroupData.groupName}/view`);
        });
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
                onSubmit={handleSubmit}/>
        </div>
    );
};

function sendDataToBackend(studyGroupData, onSuccess) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("sent data success");
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    var url = "http://localhost:8080/ProjectTest/StudyGroupCreateServlet";

    // Prepare URL-encoded data
    var formData = new URLSearchParams();
    formData.append("groupName", studyGroupData.groupName);
    formData.append("location", studyGroupData.location);
    formData.append("privacy", studyGroupData.privacy);
    formData.append("code", studyGroupData.code || ""); // handle optional code
    formData.append("courses", JSON.stringify(studyGroupData.courses));
    formData.append("meetingTimes", JSON.stringify(studyGroupData.meetingTimes));

    xhttp.open("POST", url, true);

    // Set Content-Type for form data
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhttp.send(formData.toString()); // line 108
}

export default CreateStudyGroupPage;
