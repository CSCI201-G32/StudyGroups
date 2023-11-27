package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class JDBCConnector {
	public static Integer checkLogin(String username, String password) {
		Connection connection = null;
		PreparedStatement st = null;
		 ResultSet resultSet = null;
		Integer status = -1; //UserID or -1 if login is incorrect
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost/StudyGroups?user=root&password=Uarer00t?");
			st = connection.prepareStatement("SELECT * FROM StudentInfo WHERE studentEmail = ? AND password = ?");
			st.setString(1, username);
            st.setString(2, password);
            
            resultSet = st.executeQuery();
            if (resultSet.next() == true) {
            	//return status as UserID
            	status = resultSet.getInt("UserID");
            }
            else {
            	//Incorrect login! Return -1;
            	status = -1;
            }
            
            
		}catch (SQLException sqle) {
			System.out.println ("SQLException: " + sqle.getMessage());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (st != null) {
					st.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
			
		}
		
		return status;
	}
	
	public static Integer registerUser(User user) {
		Connection connection = null;
		PreparedStatement st1 = null;
		PreparedStatement st2 = null;
		ResultSet resultSet1 = null;

		Integer status = -1; //UserID or -1 if User cannot be added
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost/StudyGroups?user=root&password=Uarer00t?");
			
			//first check if the user already exists in the DB
			st1 = connection.prepareStatement("SELECT * FROM StudentInfo WHERE studentEmail = ?");
			st1.setString(1, user.getEmail());
			
			resultSet1 = st1.executeQuery();
            if (resultSet1.next() == true) {
            	//User already exists!
            	status = -1;
            }
            else {
            	
            	//now that we know there is no existing user, let's try to insert
            	st2 = connection.prepareStatement("INSERT INTO StudentInfo (fname, lname, studentEmail, studentMajor, password) VALUES (?, ?, ?, ?, ?)");
            	
            	st2.setString(1, user.getFname());
            	st2.setString(2, user.getLname());
            	st2.setString(3, user.getEmail());
            	st2.setString(4, user.getMajor());
            	st2.setString(5, user.getPassword());
            	st2.executeUpdate();
            	
            	
            	//now let's verify we've inserted by testing login
            	status = checkLogin(user.getEmail(), user.getPassword());
            	
            }
			

			
            
            
		}catch (SQLException sqle) {
			System.out.println ("SQLException: " + sqle.getMessage());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}finally {
			try {
				if (resultSet1 != null) {
					resultSet1.close();
				}
				if (st1 != null) {
					st1.close();
				}
				if (st2 != null) {
					st2.close();
				}
				if(connection != null) {
					connection.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
			
		}
		
		return status;
		
	}

}
