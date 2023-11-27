import java.sql.*;
import java.util.ArrayList;


public class SQLConnector {
	

	public static void main(String[] args) {
		
	}
	
	public static Connection connect() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/StudyGroups?user=root&password=root");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return conn;
	}
	
	public static int insertStudyGroup(StudyGroup sg) throws SQLException {
		System.out.println(sg.getGroupName());
		System.out.println(sg.getLocation());
		System.out.println(sg.getPrivacy());
		System.out.println(sg.getAccessCode());
	    String query = "INSERT INTO StudyGroups (group_name, location, privacy, access_code) VALUES (?, ?, ?, ?)";
	    try {
	        Connection conn = connect();
	        PreparedStatement preparedStatement = conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
	        preparedStatement.setString(1, sg.getGroupName());
	        preparedStatement.setString(2, sg.getLocation());
	        preparedStatement.setString(3, sg.getPrivacy());
	        preparedStatement.setString(4, sg.getAccessCode());

	        preparedStatement.executeUpdate();

	        // Retrieve the generated key (study group ID)
	        ResultSet resultSet = preparedStatement.getGeneratedKeys();
	        int studyGroupID = -1;
	        if (resultSet.next()) {
	            studyGroupID = resultSet.getInt(1);
	        }

	        // Inserts the courses into the StudyGroupCourses table
	        query = "INSERT INTO StudyGroupCourses (group_ID, course_ID) VALUES (?, ?)";
	        for (String courseName : sg.getCourses()) {
	        	int courseID = getCourseID(conn, courseName);
	        	if (courseID == -1) {
	        		courseID = addCourse(conn, courseName);
	        	}
	        	preparedStatement = conn.prepareStatement(query);
    	        preparedStatement.setInt(1, studyGroupID);
    	        preparedStatement.setInt(2, courseID);
    	        preparedStatement.executeUpdate();
	        }

	        // Insert meeting times
	        query = "INSERT INTO StudyGroupMeetings (meeting_day, meeting_time, group_id) VALUES (?, ?, ?)";
	        for (MeetingTime mt : sg.getMeetingTimes()) {
	        	preparedStatement = conn.prepareStatement(query);
	        	preparedStatement.setString(1, mt.getDay());
    	        preparedStatement.setString(2, mt.getTime());
    	        preparedStatement.setInt(3, studyGroupID);
    	        preparedStatement.executeUpdate();
	        }

	        return studyGroupID;
	    } catch (SQLException e) {
	        System.out.println(e.getMessage());
	        return -1; // Indicates failure
	    }
	}
	
	// Gets the course ID based on the course name
	private static int getCourseID(Connection connection, String courseName) {
		String query = "SELECT c.* FROM studygroups.Courses c WHERE c.courseName = ?";
		try {
			PreparedStatement preparedStatement = connection.prepareStatement(query);
			preparedStatement.setString(1, courseName);
		    ResultSet resultSet = preparedStatement.executeQuery();
		    if (resultSet.next()) {
		    	int courseID = resultSet.getInt("CourseID");
		    	return courseID;
		    }
		    return -1;
		} catch (SQLException e) {
			return -1;
		}
	}
	
	// Adds the course based on the course name
	private static int addCourse(Connection connection, String courseName) {
	    String query = "INSERT INTO Courses (CourseName) VALUES (?)";
	    try {
	        PreparedStatement preparedStatement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
	        preparedStatement.setString(1, courseName);

	        // Use executeUpdate() instead of executeQuery() for INSERT statements
	        int affectedRows = preparedStatement.executeUpdate();
	        System.out.println("Number of affected rows: " + affectedRows);

	        // Retrieve the generated key (course ID)
	        ResultSet resultSet = preparedStatement.getGeneratedKeys();
	        if (resultSet.next()) {
	            int courseID = resultSet.getInt(1); // Use column index 1 to retrieve the first column
	            System.out.println("Generated course ID: " + courseID);
	            return courseID;
	        } else {
	            System.out.println("No course ID generated.");
	            return -1;
	        }
	    } catch (SQLException e) {
	        System.out.println("SQLException in addCourse: " + e.getMessage());
	        e.printStackTrace();
	        return -1;
	    }
	}
	

	// Finds the study group in the SQL database based on the group name and returns it as a StudyGroup object
	 public static StudyGroup getStudyGroup(String groupName) throws SQLException {
		 
		 //Gets study groups w courses and meeting times
		String query = "SELECT sg.* FROM StudyGroups sg WHERE sg.group_name = ?";
	
	
	     try {
	    	 Connection connection = connect();
		      PreparedStatement preparedStatement = connection.prepareStatement(query);
		      preparedStatement.setString(1, groupName);
		      ResultSet resultSet = preparedStatement.executeQuery();
	         if (resultSet.next()) {
	        	 String location = resultSet.getString("location");
	        	 String privacy = resultSet.getString("privacy");
	        	 String accessCode = resultSet.getString("access_code");
	             
	
	             ArrayList<String> courses = new ArrayList<String>();
	             ArrayList<MeetingTime> meetingTimes = new ArrayList<MeetingTime>();
	             
	             
	             // Finds the courses and adds them to the study group
	             query = "SELECT sg.group_id, c.CourseName FROM studygroups.studygroups sg JOIN studygroups.studygroupcourses sc ON sg.group_id = sc.group_id JOIN studygroups.Courses c ON sc.course_id = c.CourseID WHERE sg.group_name = ?";
	             
	             preparedStatement = connection.prepareStatement(query);
	             preparedStatement.setString(1, groupName);
	             resultSet = preparedStatement.executeQuery();
	             
	             while (resultSet.next()) {
	            	 String course = resultSet.getString("CourseName");
	            	 courses.add(course);
	             }
	             
	             // Finds the meeting times and adds them to the study group
	             query = "SELECT sm.* FROM studygroups.studygroupmeetings sm JOIN studygroups.studygroups sg ON sm.group_id = sg.group_id WHERE sg.group_name = ?";
	             preparedStatement = connection.prepareStatement(query);
	             preparedStatement.setString(1, groupName);
	             resultSet = preparedStatement.executeQuery();
	             while (resultSet.next()) {
	            	 String day = resultSet.getString("meeting_day");
	            	 String time = resultSet.getString("meeting_time");
	            	 MeetingTime mt = new MeetingTime(day, time);
	            	 meetingTimes.add(mt);
	             }
	             
	             StudyGroup studyGroup = new StudyGroup(groupName, courses, meetingTimes, location, privacy, accessCode);
	             return studyGroup;
	         }
	     } catch (SQLException e) {
	    	 System.out.println(e.getMessage());
	    	 return null;
	     }
	     return null; // Indicates no study group found
	 }
}
	
	