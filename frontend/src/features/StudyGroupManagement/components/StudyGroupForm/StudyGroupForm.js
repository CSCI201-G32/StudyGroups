import React from 'react';
import DayTimeComp from '../../../../components/InputField/DayTimeComp';

const StudyGroupForm = ({
    groupName,
    onGroupNameChange,
    courses,
    onCourseInputChange,
    onAddCourse,
    newCourse,
    meetingTimes,
    onAddMeetingTime,
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
    
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
            type="text"
            value={groupName}
            onChange={onGroupNameChange}
            placeholder="Enter Group Name"
        />
        <br></br>
        {/* Course input */}
        <input
          type="text"
          value={newCourse}
          onChange={onCourseInputChange}
          placeholder="Add Course"
        />
        <button type="button" onClick={onAddCourse}>Add</button>
  
        {/* List of added courses */}
        {courses.map((course, index) => <div key={index}>{course}</div>)}
  
        <DayTimeComp
        meetingTimes={meetingTimes}
        onAddMeetingTime={onAddMeetingTime}/>
  
        <input 
            type="text"
            value={location}
            onChange={onLocationChange}
            placeholder="Location"
        />

        <div>
          <button
            type="button"
            onClick={() => onPrivacyChange('PUBLIC')}
            className={privacy === 'PUBLIC' ? 'active' : ''}
          >
            Public
          </button>
          <button
            type="button"
            onClick={() => onPrivacyChange('PRIVATE')}
            className={privacy === 'PRIVATE' ? 'active' : ''}
          >
            Private
          </button>
        </div>

        {/* Conditional rendering for 'CODE' field */}
        {privacy === 'PRIVATE' && (
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
          />
        )}
  
        {/* ... other form inputs ... */}
        <br></br>
        <button type="button" onClick={onSubmit}>Create Study Group</button>
      </form>
    );
  };
  
  export default StudyGroupForm;
  