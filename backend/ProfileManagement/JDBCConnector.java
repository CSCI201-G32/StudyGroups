public class JDBCConnector {
	public static List<String> getUserAccount(String userId) throws ClassNotFoundException{
		Connection conn = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		List<String> result = new ArrayList<String>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/StudyGroups?user=root&password=Uarer00t?");
			
			st = conn.prepareStatement("SELECT * FROM StudentInfo WHERE UserID = ?");
			st.setString(1,  userId);
			rs = st.executeQuery();
			
			while(rs.next()) {
				String first = rs.getString("fname");
				String last = rs.getString("lname");
                		String email = rs.getString("studentEmail");
				String major = rs.getString("studentMajor");
				result.add(first);
				result.add(last);
				result.add(email);
				result.add(major);
			}
			
		}
		catch (SQLException sqle) {
			System.out.println(sqle.getMessage());
		}
		finally {
			try {
				if(st != null) {
					st.close();
				}
				if(conn != null) {
					conn.close();
				}
				if(rs != null) {
					rs.close();
				}
			}
			catch(SQLException sqle) {
				System.out.println(sqle.getMessage());
			}
		}
		
		return result;
	}
	
	public static List<String> getSearch(String param) throws ClassNotFoundException {
		Connection conn = null;
		PreparedStatement st = null;
        PreparedStatement st2 = null;
		ResultSet rs = null;
        ResultSet rs2 = null;
        List<String> result = new ArrayList<String>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/StudyGroups?user=root&password=Uarer00t?");
			
			st = conn.prepareStatement("SELECT group_id, group_name FROM StudyGroups WHERE group_name LIKE = ?");
			st.setString(1,  '%' + param + '%');
			rs = st.executeQuery();
			
			while(rs.next()) {
				String name = rs.getString("group_name");
                String groupId = rs.getString("group_id");
                st2 = conn.prepareStatement("SELECT course_id FROM StudyGroupCourses WHERE group_id = ?");
                st2.setString(1, groupId);
                rs2 = st2.executeQuery();
                String courseId = rs2.getString("course_id");
                st2 = conn.prepareStatement("SELECT CourseName FROM Courses WHERE CourseID = ?");
                st2.setString(1, courseId);
                rs2 = st2.executeQuery();
                String course = rs2.getString("CourseName");

                result.add(name + " studying " + course);
			}
			
		}
		catch (SQLException sqle) {
			System.out.println(sqle.getMessage());
		}
		finally {
			try {
				if(st != null) {
					st.close();
				}
				if(conn != null) {
					conn.close();
				}
				if(rs != null) {
					rs.close();
				}
                if(st2 != null) {
					st2.close();
				}
                if(rs2 != null) {
					rs2.close();
				}
			}
			catch(SQLException sqle) {
				System.out.println(sqle.getMessage());
			}
		}
		
		return result;
	}
}
