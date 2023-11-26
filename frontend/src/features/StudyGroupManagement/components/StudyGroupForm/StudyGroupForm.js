import React from 'react';
import DayTimeComp from '../../../../components/InputField/DayTimeComp';
import '../../../../assets/StudyGroup.css';

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
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(courses.length === 0){
        alert("At least one course must be added.");
        return; 
      }

      if(meetingTimes.length === 0){
        alert("At least one meeting time must be added.");
        return; 
      }

      onSubmit();
  };

    return (
      <form onSubmit={handleSubmit} >
        <input 
            type="text"
            value={groupName}
            onChange={onGroupNameChange}
            placeholder="Enter Group Name"
            required
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
        <div className="course-list">
    {courses.map((course, index) => (
        <div key={index} className="course-item">{course}</div>
    ))}
</div>  
  
        <DayTimeComp
        meetingTimes={meetingTimes}
        onAddMeetingTime={onAddMeetingTime}/>
  
        <input 
            type="text"
            value={location}
            onChange={onLocationChange}
            placeholder="Location"
            required
        />

        <div class="privacy-buttons">
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

        {privacy === 'PRIVATE' && (
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            required
          />
        )}

        <br></br>
        <button type="submit">Create Study Group</button>
      </form>
    );
    
  };

  
  
  export default StudyGroupForm;
  