import React from 'react';

const StudyGroupForm = ({
    groupName,
    onGroupNameChange,
    courses,
    onCourseInputChange,
    onAddCourse,
    newCourse,
    privacy,
    code,
    setCode,
    onSubmit
    /* ... other props ... */
  }) => {
    // Form JSX
    return (
      <form>
        <input 
            type="text"
            value={groupName}
            onChange={onGroupNameChange}
            placeholder="Enter Group Name"
        />
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
  
        {/* ... other form inputs ... */}
  
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
  
        <button type="button" onClick={onSubmit}>Create</button>
      </form>
    );
  };
  
  export default StudyGroupForm;
  