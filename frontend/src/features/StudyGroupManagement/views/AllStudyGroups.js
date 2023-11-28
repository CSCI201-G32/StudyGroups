import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../assets/study-group/FullStudyPage.css';
import '../../../assets/study-group/AllStudyGroups.css';
import StudyGroupWidget from '../components/StudyGroupWidget';
import debounce from 'lodash.debounce';

const AllStudyGroups = () => {
    const [searchTerm,
        setSearchTerm] = useState('');
    const [newCourse,
        setNewCourse] = useState('');
    const [courses,
        setCourses] = useState([]);
    const [selectedDays,
        setSelectedDays] = useState({
        Mon: false,
        Tues: false,
        Weds: false,
        Thurs: false,
        Fri: false,
        Sat: false,
        Sun: false
    });
    const [privacy,
        setPrivacy] = useState('PUBLIC');
    const [queryResults,
        setQueryResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        const newValue = event
            .target
            .value
            .replace(/\s/g, '')
            .substring(0, 20);
        setSearchTerm(newValue);
    };

    const handleCourseInputChange = (event) => {
        const newValue = event
            .target
            .value
            .toUpperCase()
            .replace(/\s/g, '')
            .substring(0, 10);
        setNewCourse(newValue);
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

    const handleDayChange = (day) => {
        setSelectedDays(prevDays => ({
            ...prevDays,
            [day]: !prevDays[day]
        }));
    };

    const handlePrivacyChange = (privacy) => {
        setPrivacy(privacy);
    };

    const handleCreateClick = () => {
        navigate('/create')
    };

    function fetchStudyGroup({
        groupName,
        courses,
        selectedDays,
        privacy
    }, callback) {
        const url = "http://localhost:8080/ProjectTest/StudyGroupReturnServlet";

        const formData = new URLSearchParams();

        if (groupName) {
            formData.append("groupName", groupName);
        }

        if (courses && courses.length > 0) {
            formData.append("courses", JSON.stringify(courses));
        }

        if (selectedDays && selectedDays.length > 0) {
            formData.append("days", JSON.stringify(selectedDays));
            console.log(JSON.stringify(selectedDays));
        }

        if(privacy && privacy != "BOTH"){
            formData.append("privacy", privacy);
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        };

        console.log(formData.toString());
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
        const callbackFunction = (error, data) => {
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log("Fetched data:", data);

                if (data && typeof data === 'object' && !Array.isArray(data)) {
                    setQueryResults([data]);
                } else {
                    setQueryResults(data);
                }
            }
        };

        // Fetch all study groups on first load.
        fetchStudyGroup({}, callbackFunction);
    }, []);

    // Fetch data when filter parameters are added
    useEffect(() => {
        const callbackFunction = (error, data) => {
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log("Fetched data:", data);

                if (data && typeof data === 'object' && !Array.isArray(data)) {
                    setQueryResults([data]);
                } else {
                    setQueryResults(data);
                }
            }
        };

        fetchStudyGroup({
            groupName: searchTerm,
            courses,
            selectedDays,
            privacy
        }, callbackFunction);
    }, [searchTerm, courses, selectedDays, privacy]);

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
                                <input
                                    type="checkbox"
                                    id="monday"
                                    name="mon"
                                    value="Mon"
                                    checked={selectedDays.Mon}
                                    onChange={() => handleDayChange('Mon')}/>
                                <label htmlFor="mon">Mon</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="tuesday"
                                    name="tues"
                                    value="Tues"
                                    checked={selectedDays.Tues}
                                    onChange={() => handleDayChange('Tues')}/>
                                <label htmlFor="tues">Tues</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="wednesday"
                                    name="weds"
                                    value="Weds"
                                    checked={selectedDays.Weds}
                                    onChange={() => handleDayChange('Weds')}/>
                                <label htmlFor="weds">Weds</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="thursday"
                                    name="thurs"
                                    value="Thurs"
                                    checked={selectedDays.Thurs}
                                    onChange={() => handleDayChange('Thurs')}/>
                                <label htmlFor="thurs">Thurs</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="friday"
                                    name="fri"
                                    value="Fri"
                                    checked={selectedDays.Fri}
                                    onChange={() => handleDayChange('Fri')}/>
                                <label htmlFor="fri">Fri</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="saturday"
                                    name="sat"
                                    value="Sat"
                                    checked={selectedDays.Sat}
                                    onChange={() => handleDayChange('Sat')}/>
                                <label htmlFor="sat">Sat</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="sunday"
                                    name="sun"
                                    value="Sun"
                                    checked={selectedDays.Sun}
                                    onChange={() => handleDayChange('Sun')}/>
                                <label htmlFor="sun">Sun</label>
                            </div>
                        </div>
                        <div className="privacy-buttons">
                            <button
                                type="button"
                                onClick={() => handlePrivacyChange('PUBLIC')}
                                className={privacy === 'PUBLIC'
                                ? 'active'
                                : ''}>
                                Public
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePrivacyChange('PRIVATE')}
                                className={privacy === 'PRIVATE'
                                ? 'active'
                                : ''}>
                                Private
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePrivacyChange('BOTH')}
                                className={privacy === 'BOTH'
                                ? 'active'
                                : ''}>
                                Both
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStudyGroups;
