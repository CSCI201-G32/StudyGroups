import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class JDBCConnector {
	public static List<String> getUserAccount(String email) throws ClassNotFoundException{
		Connection conn = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		List<String> result = new ArrayList<String>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/Yelp?user=root&password=???");
			
			st = conn.prepareStatement("SELECT * FROM Users WHERE studentEmail = ?");
			st.setString(1,  email);
			rs = st.executeQuery();
			
			while(rs.next()) {
				String first = rs.getString("fname");
				String last = rs.getString("lname");
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
	
	public static String getUserGroups(String email) throws ClassNotFoundException {
		Connection conn = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/Yelp?user=root&password=???");
			
			st = conn.prepareStatement("SELECT UserID FROM Users WHERE studentEmail = ?");
			st.setString(1,  email);
			rs = st.executeQuery();
			
			while(rs.next()) {
				
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
		
		return "";
	}
}
