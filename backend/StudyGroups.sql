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

/*Create a chat that is specific to certain users*/

CREATE TABLE chat (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    unread_messages_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID)
);

/*Keep track of which user sent what message and in which
chat they sent it in*/

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    message VARCHAR(1000),
    time_sent TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID)
);

/*Hold files that users send*/

CREATE TABLE files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255),
    file_path VARCHAR(255)
);

/*Have a list of emojis that users can access*/

CREATE TABLE emojis (
    emoji_id INT AUTO_INCREMENT PRIMARY KEY,
    emoji_text VARCHAR(10),
    emoji_image_path VARCHAR(255)
);

CREATE TABLE contact_list (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- User who owns the contact
    contact_user_id INT, -- User who is a contact
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID),
    FOREIGN KEY (contact_user_id) REFERENCES StudentInfo(UserID)
);

-- Create the `blocked_users` table
CREATE TABLE blocked_users (
    block_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- User who is blocking
    blocked_user_id INT, -- User who is blocked
    FOREIGN KEY (user_id) REFERENCES StudentInfo(UserID),
    FOREIGN KEY (blocked_user_id) REFERENCES StudentInfo(UserID)
);

