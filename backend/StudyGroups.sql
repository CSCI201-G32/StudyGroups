DROP DATABASE IF EXISTS StudyGroups;
CREATE DATABASE StudyGroups;

USE StudyGroups;


/*Student info is the table that we will insert 
into whenever a new user is created. It contains
the UserID, which will be the unique identifier 
for an account throughout our web app.*/

CREATE TABLE StudentInfo (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(40) NOT NULL,
    lname VARCHAR(40) NOT NULL,
    studentEmail VARCHAR(40) NOT NULL,
    studentMajor VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL
);

/*Test user just to verify functionality.
Feel free to add more :) */

INSERT INTO StudentInfo (UserID, fname, lname, studentEmail, studentMajor, password)
	VALUES	(1, 'Carol', 'Folt', 'cfolt@usc.edu', 'Environmental Studies', 'FightOn!123');

/*List of all courses offered. Maybe we 
can pull data from the course registration
site? If not, we can just put *some* courses
that we think our users would take. This table gets queried
when a user is entering in their current and past courses on
the registration page */

CREATE TABLE Courses (
	CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(40) NOT NULL
);

INSERT INTO Courses (CourseID, CourseName)
	VALUES	(1, 'CSCI201'),
			(2, 'CSCI270');

/*Added to during registration, will tie a user to what
courses that they are enrolled in currently. Needed? */

CREATE TABLE CourseEnrollment (
	EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    CourseID INT NOT NULL,
    FOREIGN KEY fk1(userID) REFERENCES StudentInfo(UserID),
    FOREIGN KEY fk2(CourseID) REFERENCES Courses(CourseID)
);

/*Carol Folt is taking CS201*/
INSERT INTO CourseEnrollment (EnrollmentID, UserID, CourseID)
	VALUES	(1, 1, 1);

/*Added to during registration, will tie a user to what
courses that they are enrolled in previously. Needed? */

CREATE TABLE PastEnrollment (
	EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    CourseID INT NOT NULL,
    FOREIGN KEY fk1(userID) REFERENCES StudentInfo(UserID),
    FOREIGN KEY fk2(CourseID) REFERENCES Courses(CourseID)
);

/*Carol Folt has taken CS270*/
INSERT INTO PastEnrollment (EnrollmentID, UserID, CourseID)
	VALUES	(1, 1, 2);

/*Keep track of which user sent what message*/

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message VARCHAR(1000),
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID)
);

/* -----------------------------------------------*/
/* This section is for the actual study groups    */
/*------------------------------------------------*/

-- Creates the main study groups table to be used for the meetings table
-- This is the building block for the study groups meeting and study groups courses table
CREATE TABLE StudyGroups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(40) NOT NULL UNIQUE,
    location VARCHAR(40),
    privacy ENUM('PRIVATE', 'PUBLIC') NOT NULL, -- Privacy can only be either 'PUBLIC' or 'PRIVATE'
    access_code VARCHAR(6) NOT NULL -- Code to access the study group
);

-- Creates a table for the meeting day and times of study groups
-- This is called from the program to get the study groups, as well as their meeting times
CREATE TABLE StudyGroupMeetings (
    meeting_id INT PRIMARY KEY AUTO_INCREMENT,
    meeting_day VARCHAR(10) NOT NULL,
    meeting_time VARCHAR(5) NOT NULL,
    group_id INT, -- Used to find the rest of the information for the study group
    FOREIGN KEY (group_id) REFERENCES StudyGroups(group_id)
);

-- Creates a table for the courses of study groups
-- This is called from the program to get the courses of each study group
CREATE TABLE StudyGroupCourses (
    group_id INT,
    course_id INT,
    FOREIGN KEY (group_id) REFERENCES StudyGroups(group_id),
    FOREIGN KEY (course_id) REFERENCES Courses(CourseID),
    PRIMARY KEY (group_id, course_id)
);

-- Creates a table for the users and study groups
-- This is called to get the study groups that each user is a part of
CREATE TABLE StudyGroupUsers (
    group_id INT,
    user_id INT,
    FOREIGN KEY (group_id) REFERENCES StudyGroups(group_id),
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID),
    PRIMARY KEY (group_id, user_id)
);

-- Insert sample study group
INSERT INTO StudyGroups (group_name, location, privacy, access_code) VALUES ('TestGroupName', 'THH101', 'PRIVATE', '123456');

-- Associate courses with the study group
INSERT INTO StudyGroupCourses (group_ID, course_ID) VALUES (1, 1); -- Assuming the study group ID is 1 and CS201 ID is 1
INSERT INTO StudyGroupCourses (group_ID, course_ID) VALUES (1, 2); -- Assuming the study group ID is 1 and EE250 ID is 2

-- Associate meeting times with the study group
INSERT INTO StudyGroupMeetings (meeting_day, meeting_time, group_id) VALUES ('Mon', '20:10', '1'); -- Assuming the study group ID is 1 and the course ID is 1 and the meeting is Mon 20:10
INSERT INTO StudyGroupMeetings (meeting_day, meeting_time, group_id) VALUES ('Wednesday', '21:10', '1'); -- Assuming the study group ID is 1 and the course ID is 2 and the meeting is Wed 21:10

-- Add user with id=1 to study group with id=1
INSERT INTO StudyGroupUsers (group_ID, user_id) VALUES (1, 1);

/* Gets study groups 
SELECT sg.* FROM studygroups.studygroups sg;
*/

/* Example SQL query to only get study group ids with courses
SELECT sg.group_id, c.CourseName
FROM studygroups.studygroups sg
JOIN studygroups.studygroupcourses sc ON sg.group_id = sc.group_id
JOIN studygroups.Courses c ON sc.course_id = c.CourseID;
*/

/* Get meetings from group id
SELECT DISTINCT
    sm.meeting_id, 
    sm.meeting_day, 
    sm.meeting_time, 
    sg.group_id
FROM 
    studygroups.studygroupmeetings sm
JOIN 
    studygroups.studygroups sg ON sm.group_id = sg.group_id
*/
