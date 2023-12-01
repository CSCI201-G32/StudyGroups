import React from 'react';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../../../assets/study-group/MeetingTime.css'
const MeetingList = ({meetingTimes, onRemoveMeetingTime}) => {
    return (
        <div
            className="meeting-list"
            style={{
            display: meetingTimes.length === 0
                ? 'none'
                : 'block'
        }}>
            {meetingTimes.map((meetingTime, index) => (
                <div key={index} className="meeting-item">
                    {`${meetingTime.day} at ${meetingTime.time}`}
                    {onRemoveMeetingTime && (<FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => onRemoveMeetingTime(index)}
                        style={{
                        marginLeft: '10px'
                    }}/>)}
                </div>
            ))}
        </div>
    );
};

export default MeetingList;
