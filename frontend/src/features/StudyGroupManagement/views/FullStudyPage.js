import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../../assets/study-group/FullStudyPage.css';
import CourseList from '../components/CourseList';
import {getCookie} from '../../../utils/utils';

const FullStudyPage = () => {
    const {groupName} = useParams();
    const [groupInfo,
        setGroupInfo] = useState(null);
    const [userList,
        setUserList] = useState([]); // Initialize userList as an empty array

    const currentUser = getCookie("UserID");

    const handleJoin = () => {

        joinStudyGroup(function (error, data) {
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                fetchStudyGroup(groupInfo.groupName, function (error, data) {
                    if (error) {
                        console.error("Error fetching data:", error);
                    } else {
                        console.log("Received data after adding user:", data);
                        setGroupInfo(data[0]); // Update the state with the fetched data
                    }
                });
            }
        });
    }

    function getUsers() {
        const url = "http://localhost:8080/StudyGroupsFinalProj_v2/UserUtil";
        console.log(groupInfo.users);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: groupInfo.users
        };

        return fetch(url, options) // Add the "return" statement here
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).catch(error => {
            throw error; // Rethrow the error to propagate it
        });
    }

    function joinStudyGroup(callback) {
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

        var url = "http://localhost:8080/ProjectTest/StudyGroupCreateServlet";

        var formData = new URLSearchParams();
        formData.append("groupName", groupInfo.groupName);
        formData.append("addUser", currentUser);

        xhttp.open("POST", url, true);

        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.send(formData.toString());
    }

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

    useEffect(() => {
        // Run this effect when groupInfo is updated
        if (groupInfo) {
            getUsers().then(userData => {
                console.log("User data:", userData);
                //userList.push(userData);
                setUserList([
                    ...userList,
                    ...userData
                ]);
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [groupInfo]);

    if (!groupInfo) {
        return <div>Ensure your group exists... Loading....</div>;
    }

    return (
        <div className="container-full-study-page">
            <div className="group-info">
                <h1>{groupInfo.groupName}</h1>
                <CourseList courses={groupInfo.courses}/>
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
                <ul>
                    {userList.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
                <button
                    className="join"
                    onClick={handleJoin}
                    style={{
                    display: groupInfo
                        .users
                        .includes(parseInt(currentUser, 10))
                        ? 'none'
                        : 'block'
                }}>Join</button>
            </div>
        </div>
    );
};

export default FullStudyPage;
