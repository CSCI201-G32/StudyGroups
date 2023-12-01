import React from 'react';
import DayTimeComp from '../../../components/InputField/DayTimeComp';
import CourseList from './CourseList';


const StudyGroupForm = ({
    groupName,
    onGroupNameChange,
    courses,
    onCourseInputChange,
    onAddCourse,
    newCourse,
    removeCourse,
    meetingTimes,
    onAddMeetingTime,
    removeMeeting,
    location,
    onLocationChange,
    privacy,
    onPrivacyChange,
    code,
    setCode,
    onSubmit
    /* ... other props ... */
}) => {
    // Form JSX

    function fetchStudyGroup(groupName, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        console.log("from server:" + this.responseText);
                        var responseData = JSON.parse(this.responseText);
                        callback(null, responseData);
                    } catch (e) {
                        callback(e, null);
                    }
                } else {
                    callback(new Error("Request failed with status: " + this.status), null);
                }
            }
        };

        var url = "http://localhost:8080/StudyGroups/StudyGroupReturnServlet";

        var formData = new URLSearchParams();
        formData.append("groupName", groupName);

        xhttp.open("POST", url, true);

        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.send(formData.toString());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (courses.length === 0) {
            alert("At least one course must be added.");
            return;
        }

        if (meetingTimes.length === 0) {
            alert("At least one meeting time must be added.");
            return;
        }

        fetchStudyGroup(groupName, (error, responseData) => {
            if (error) {
                console.error("Error fetching data: ", error);
                return;
            }

            // If the group name already exists
            if (responseData.length > 0) {
                alert("This group name already exists. Please choose a different name.");
            } else {
                // Group name does not exist, proceed with the form submission
                onSubmit();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={groupName}
                onChange={onGroupNameChange}
                placeholder="Enter Group Name"
                required/>
            <br></br>

            <div className="course-input">
                <input
                    type="text"
                    value={newCourse}
                    onChange={onCourseInputChange}
                    placeholder="Add Course"/>
                <button type="button" onClick={onAddCourse}>Add</button>
            </div>
            <CourseList courses={courses} onRemoveCourse={removeCourse}/>

            <DayTimeComp meetingTimes={meetingTimes} onAddMeetingTime={onAddMeetingTime} onRemoveMeeting={removeMeeting}/>

            <input
                type="text"
                value={location}
                onChange={onLocationChange}
                placeholder="Location"
                required/>

            <div className="privacy-buttons">
                <button
                    type="button"
                    onClick={() => onPrivacyChange('PUBLIC')}
                    className={privacy === 'PUBLIC'
                    ? 'active'
                    : ''}>
                    Public
                </button>
                <button
                    type="button"
                    onClick={() => onPrivacyChange('PRIVATE')}
                    className={privacy === 'PRIVATE'
                    ? 'active'
                    : ''}>
                    Private
                </button>
            </div>

            {privacy === 'PRIVATE' && (<input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.substring(0, 6))}
                placeholder="Enter Code"
                required/>)}

            <br></br>
            <button type="submit">Create Study Group</button>
        </form>
    );

};

export default StudyGroupForm;
