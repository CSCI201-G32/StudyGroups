import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../assets/FullStudyPage.css';
import '../../../assets/AllStudyGroups.css';
import StudyGroupWidget from '../components/StudyGroupWidget';

const AllStudyGroups = () => {
    const [searchTerm,
        setSearchTerm] = useState('');
    const [newCourse,
        setNewCourse] = useState('');
    const [courses,
        setCourses] = useState([]);
    const [queryResults, setQueryResults] = useState([]); 
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCourseInputChange = (event) => {
        setNewCourse(event.target.value);
    };

    const handleAddCourse = () => {
        if (newCourse && !courses.includes(newCourse)) {
            setCourses([
                ...courses,
                newCourse
            ]);
            setNewCourse('');
        }
    };

    const handleCreateClick = () => {
        navigate('/create')
    };

    function fetchStudyGroup(groupName, callback) {
        const url = "http://localhost:8080/ProjectTest/StudyGroupReturnServlet";

        const formData = new URLSearchParams();
        //formData.append("groupName", groupName);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        };

        fetch(url, options).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => callback(null, data))
            .catch(error => callback(error, null));
    }

    useEffect(() => {
        const groupName = "";
    
        fetchStudyGroup(groupName, function (error, data) {
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log(data);
                // If data is an object, wrap it in an array
                if (data && typeof data === 'object' && !Array.isArray(data)) {
                    setQueryResults([data]); // Sets queryResults to an array containing the single object
                } else {
                    setQueryResults(data); // Assuming data is already an array
                }
            }
        });
    
    }, []);
    

    useEffect(() => {
        console.log("Updated queryResults:", queryResults);
    }, [queryResults]); // This useEffect runs whenever queryResults changes

    return (
        <div className="container-all-study-groups">
            <div>
                <h1>Study Groups</h1>
            </div>
            <div className="info">
                <div className="search-bar">
                    <button onClick={handleCreateClick}>Create Group</button>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."/>
                </div>
                <div className="info-filter">
                    <div className="study-group-views">
                        {queryResults.map((group, index) => (<StudyGroupWidget
                            key={index}
                            name={group.groupName}
                            courses={group.courses}
                            meetingTimes={group.meetingTimes}
                            location={group.location}
                            privacy={group.privacy}/>))}
                    </div>
                    <div className="filter-menu">
                        <h2>Filters</h2>
                        <div className="courses">
                            <h3>Courses:</h3>
                            <div className="course-input">
                                <input
                                    type="text"
                                    value={newCourse}
                                    onChange={handleCourseInputChange}
                                    placeholder="Add Course"/>
                                <button type="button" onClick={handleAddCourse}>Add</button>
                            </div>
                            <div
                                className="course-list"
                                style={{
                                display: courses.length === 0
                                    ? 'none'
                                    : 'block'
                            }}>
                                {courses.map((course, index) => (
                                    <div key={index} className="course-item">{course}</div>
                                ))}
                            </div>
                        </div>
                        <div className="days">
                            <h3>Days:</h3>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="monday" name="mon" value="Mon"/>
                                <label htmlFor="mon">Mon</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="tuesday" name="tues" value="Tues"/>
                                <label htmlFor="tues">Tues</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="wednesday" name="weds" value="Weds"/>
                                <label htmlFor="weds">Weds</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="thursday" name="thurs" value="Thurs"/>
                                <label htmlFor="thurs">Thurs</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="friday" name="fri" value="Fri"/>
                                <label htmlFor="fri">Fri</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="saturday" name="sat" value="Sat"/>
                                <label htmlFor="sat">Sat</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="sunday" name="sun" value="Sun"/>
                                <label htmlFor="sun">Sun</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllStudyGroups;
