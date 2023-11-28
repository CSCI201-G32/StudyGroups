import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../../assets/FullStudyPage.css';

const FullStudyPage = () => {
    const {groupName} = useParams();
    const [groupInfo,
        setGroupInfo] = useState(null);

    function fetchStudyGroup(groupName, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
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

        var url = "http://localhost:8080/ProjectTest/StudyGroupReturnServlet";

        var formData = new URLSearchParams();
        formData.append("groupName", groupName);

        xhttp.open("POST", url, true);

        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.send(formData.toString());
    }

    useEffect(() => {
        // Ensure groupName is not undefined or null
        if (!groupName) {
            console.error("Group name is not provided.");
            return;
        }

        fetchStudyGroup(groupName, function (error, data) {
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log("Received data:", data);
                setGroupInfo(data[0]); // Update the state with the fetched data
            }
        });

    }, [groupName]);

    if (!groupInfo) {
        return <div>Ensure your group exists... Loading....</div>;
    }

    return (
        <div className="container-full-study-page">
            <div className="group-info">
                <h1>{groupInfo.groupName}</h1>
                <div className="course-list">
                    {groupInfo
                        .courses
                        .map((course, index) => (
                            <div key={index} className="course-item">{course}</div>
                        ))}
                </div>
                <div className="time-list">
                    {groupInfo
                        .meetingTimes
                        .map((meetingTime, index) => (
                            <div key={index}>{`${meetingTime.day} at ${meetingTime.time}`}</div>
                        ))}
                </div>
                <p>Location: {groupInfo.location}</p>
                <p>Privacy: {groupInfo.privacy}</p>
            </div>
            <div className="sidebar">
                <h2>Current Members</h2>

                <button className="join">Join</button>
            </div>
        </div>
    );
};

export default FullStudyPage;
