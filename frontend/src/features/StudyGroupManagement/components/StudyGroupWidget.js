import React from 'react';
import '../../../assets/study-group/StudyGroupWidget.css';
import { useNavigate } from 'react-router-dom';


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';

const StudyGroupWidget = ({name, courses, meetingTimes, location, privacy}) => {
    const isPrivate = typeof privacy === 'string' && privacy.toLowerCase() === 'private';
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${name}/view`);
    };
    return (
        <div className="study-group-widget" onClick={handleClick}>
            <div className="icon-text-combo">
                {isPrivate
                        ? <FontAwesomeIcon icon={faLock}/>
                        : <FontAwesomeIcon icon={faLockOpen}/>}
                <h3>{name}</h3>
            </div>
            <div className="icon-text-combo">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{location}</span>
            </div>

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
            
        </div>
    );
};

export default StudyGroupWidget;