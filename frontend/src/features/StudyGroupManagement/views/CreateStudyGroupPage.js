import React, {useState} from 'react';
import StudyGroupForm from '../components/StudyGroupForm';
import {useNavigate} from 'react-router-dom';
import { getCookie } from '../../../utils/utils';
import { useEffect } from 'react';
import '../../../assets/study-group/StudyGroup.css';

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
            .replace(/\s/g, '')
            .substring(0, 20);
        setGroupName(newValue);
    };

    const handleCourseInputChange = (event) => {
        const newValue = event
            .target
            .value
            .toUpperCase()
            .replace(/\s/g, '')
            .substring(0, 10);
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

    const handleRemoveCourse = (courseIndex) => {
        const newCourses = courses.filter((_, index) => index !== courseIndex);
        setCourses(newCourses);
    };

    const handleRemoveMeeting = (meetingIndex) => {
        const newMeeting = meetingTimes.filter((_, index) => index !== meetingIndex);
        setMeetingTimes(newMeeting);
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
        const newValue = event
        .target
        .value
        .substring(0, 20);
        setLocation(newValue);
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

    useEffect(() => {
        
        if(getCookie("UserID") < 1){
            alert("Login or Register to Create a Study Group!")
            navigate("/");
        }

    }, []);

    return (
        <div className="create-container">
            <h1>Create</h1>
            <StudyGroupForm
                groupName={groupName}
                onGroupNameChange={handleGroupNameChange}
                courses={courses}
                onCourseInputChange={handleCourseInputChange}
                onAddCourse={handleAddCourse}
                newCourse={newCourse}
                removeCourse={handleRemoveCourse}
                meetingTimes={meetingTimes}
                onAddMeetingTime={handleAddMeetingTime}
                removeMeeting={handleRemoveMeeting}
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

    var url = "http://localhost:8080/StudyGroups/StudyGroupCreateServlet";

    // Prepare URL-encoded data
    var formData = new URLSearchParams();
    formData.append("groupName", studyGroupData.groupName);
    formData.append("location", studyGroupData.location);
    formData.append("privacy", studyGroupData.privacy);
    formData.append("code", studyGroupData.code || ""); // handle optional code
    formData.append("courses", JSON.stringify(studyGroupData.courses));
    formData.append("meetingTimes", JSON.stringify(studyGroupData.meetingTimes));
    formData.append("addUser", getCookie("UserID"));

    console.log(formData.toString());
    xhttp.open("POST", url, true);

    // Set Content-Type for form data
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhttp.send(formData.toString()); // line 108
}

export default CreateStudyGroupPage;
