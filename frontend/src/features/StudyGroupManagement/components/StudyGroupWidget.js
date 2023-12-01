import React from 'react';
import '../../../assets/study-group/StudyGroupWidget.css';
import {useNavigate} from 'react-router-dom';
import {getCookie} from '../../../utils/utils';
import {useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {faLocationDot, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';

const StudyGroupWidget = ({
    name,
    courses,
    meetingTimes,
    location,
    privacy,
    users
}) => {
    const isPrivate = typeof privacy === 'string' && privacy.toLowerCase() === 'private';
    const navigate = useNavigate();
    const [isLoggedIn,
        setIsLoggedIn] = useState(false);
    const [isPartOfGroup,
        setIsPartOfGroup] = useState(false);

    const handleClick = () => {
        if (isLoggedIn) {
            navigate(`/${name}/view`);
        }

    };

    const currentUser = getCookie("UserID");

    // see if the user is part of the group
    useEffect(() => {
        setIsPartOfGroup(users.includes(parseInt(currentUser, 10)));
    }, []);

    useEffect(() => {
        const cookie = getCookie("UserID");
        setIsLoggedIn(cookie > 0);
    }, []);

    const widgetClassName = `study-group-widget ${isLoggedIn
        ? 'study-group-widget-logged-in'
        : ''}`;

    return (
        <div className={widgetClassName} onClick={handleClick}>
            <div className="icon-text-combo">
                {isPrivate
                    ? <FontAwesomeIcon icon={faLock}/>
                    : <FontAwesomeIcon icon={faLockOpen}/>}
                <h3>{name}</h3>
            </div>
            <div className="icon-text-combo">
                <div className="icon-text-combo" style={{
                    display: (!isPartOfGroup && isPrivate) || !isLoggedIn
                        ? 'none'
                        : ''
                }}>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <span>{location}</span>
                </div>
                <div className="icon-text-combo">
                    <FontAwesomeIcon icon={faPeopleGroup}/>
                    <span>{users.length}{isPartOfGroup ? ", Joined" : ""}</span>
                </div>

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