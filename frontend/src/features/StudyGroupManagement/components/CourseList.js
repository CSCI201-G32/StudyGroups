import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CourseList = ({ courses, onRemoveCourse }) => {
  return (
    <div className="course-list" style={{
      display: courses.length === 0
          ? 'none'
          : 'block'
  }}>
      {courses.map((course, index) => (
        <div key={index} className="course-item">
          {course}
          {onRemoveCourse && (
            <FontAwesomeIcon icon={faXmark} onClick={() => onRemoveCourse(index)} style={{ marginLeft: '10px' }}/>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
