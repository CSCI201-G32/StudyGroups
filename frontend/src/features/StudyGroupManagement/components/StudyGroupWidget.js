import React from 'react';
import '../../../assets/StudyGroupWidget.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const StudyGroupWidget = ({name, courses, meetingTimes, location, privacy}) => {
    const isPrivate = typeof privacy === 'string' && privacy.toLowerCase() === 'private';

    return (
        <div className="study-group-widget">
            <p>{isPrivate ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />}{privacy}</p>
            <h3>{name}</h3>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
            <ul>
                {meetingTimes.map((meetingTime, index) => (
                    <li key={index}>{`${meetingTime.day} at ${meetingTime.time}`}</li>
                ))}
            </ul>
            <p>{location}</p>
        </div>
    );
};

export default StudyGroupWidget;