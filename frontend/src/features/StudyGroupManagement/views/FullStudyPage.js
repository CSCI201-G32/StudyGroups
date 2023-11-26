import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../../assets/FullStudyPage.css';

const FullStudyPage = () => {
    const {groupName} = useParams();
    const [groupInfo,
        setGroupInfo] = useState(null);

    useEffect(() => {
        // Replace this with the actual fetch call to your servlet
        const fetchData = async() => {
            // For testing, using predefined JSON
            const testData = {
                groupName: "Best-Group",
                courses: [
                    "CSCI201", "EE250"
                ],
                meetingTimes: [
                    {
                        day: "Mon",
                        time: "15:23"
                    }, {
                        day: "Weds",
                        time: "12:19"
                    }
                ],
                location: "THH202",
                privacy: "PUBLIC"
            };
            setGroupInfo(testData);
        };

        fetchData();
    }, [groupName]);

    if (!groupInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
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
            <div class="sidebar">
                <h2>Current Members</h2>

                <button class="join">Join</button>
            </div>
        </div>
    );
};

export default FullStudyPage;
