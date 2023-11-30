package Chat;
import java.io.BufferedReader;
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

@WebServlet("/GetUser")
public class GetUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	// Get the messages in database to be displayed when chat loads
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");	
		
		StringBuffer inputString = new StringBuffer();
		String line = null;
		System.out.println("here");
		Message newmessage = new Message();

		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null)
				inputString.append(line);
		} 
		catch (Exception e) {
			System.out.println(e);
		}

		try {
			Gson gson = new Gson();
			newmessage = gson.fromJson(inputString.toString(), Message.class);

			getName(newmessage);

			out.print(gson.toJson(newmessage.getUsername()));
			out.flush();
			out.close();

		} catch (JsonParseException jse) {
			System.out.println("JsonParseException: " + jse.getMessage());
		}

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		
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
