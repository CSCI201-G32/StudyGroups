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
    privacy,
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
  