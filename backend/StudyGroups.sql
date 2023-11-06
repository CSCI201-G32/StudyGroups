DROP DATABASE IF EXISTS StudyGroups;
CREATE DATABASE StudyGroups;

USE StudyGroups;


/*Student info is the table that we will insert 
into whenever a new user is created. It contains
the UserID, which will be the unique identifier 
for an account throughout our web app.*/

CREATE TABLE StudentInfo (
	UserID INT PRIMARY KEY,
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

