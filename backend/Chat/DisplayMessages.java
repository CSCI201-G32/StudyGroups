package Chat;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import com.google.gson.*;

@WebServlet("/DisplayMessages")
public class DisplayMessages extends HttpServlet {
	private static final long serialVersionUID = 1L;

	// Get the messages in database to be displayed when chat loads
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("hello");
		Gson gson = new GsonBuilder().setPrettyPrinting().create();

		List<Message> messages = new ArrayList<>();
		
		Connection conn = null;
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		// Username of the person who sent the message
		Integer user_id;
		// Message that was sent
		String message = "";

		// Queries the whole Messages table to
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = connectToDatabase();

			st = conn.createStatement();
			ps = conn.prepareStatement("SELECT * FROM Messages");

			rs = ps.executeQuery();

			// Creates a new message that was logged in the data base
			while (rs.next()) {
				Message mess = new Message();
				user_id = rs.getInt("user_id");
				message = rs.getString("message");

				mess.setUser_id(user_id);
				mess.setMessage(message);

				getName(mess);

				messages.add(mess);
			}
		} catch (SQLException sqle) {
			System.out.println("SQLException: " + sqle.getMessage());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} finally {
			closeResources(conn, rs, st, ps);
		}
		
		String responseJson = gson.toJson(messages);
		System.out.println(responseJson);
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");	

	    response.setStatus(HttpServletResponse.SC_OK);
	    
		PrintWriter out = response.getWriter();
		
		out.print(responseJson);
		out.flush();
		out.close();

	}

	// Get the name of the person associated with the user_id
	private void getName(Message mess) {

		Connection conn = null;
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String username = "";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = connectToDatabase();

			st = conn.createStatement();
			ps = conn.prepareStatement("SELECT * FROM StudentInfo " +
                    					"WHERE UserID=?");
			
			ps.setInt(1, mess.getUser_id());

			rs = ps.executeQuery();

			while (rs.next()) {
				username = rs.getString("studentEmail");
				String[] name = username.split("@");
				
				username = name[0];
				mess.setUsername(username);
				
			}
		} catch (SQLException sqle) {
			System.out.println("SQLException: " + sqle.getMessage());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} finally {
			closeResources(conn, rs, st, ps);
		}

	}

/*---------------------------------------------------------------------------------------------------------------------------------------*/	
	
	private static Connection connectToDatabase() throws SQLException {
		return DriverManager.getConnection("jdbc:mysql://localhost/StudyGroups?user=root&password=root");
	}

	private static void closeResources(Connection conn, ResultSet rs, Statement st, PreparedStatement ps) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (st != null) {
				st.close();
			}
			if (ps != null) {
				ps.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
		}
	}
}
