package StudyGroup;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/StudyGroupReturnServlet")
public class StudyGroupReturnServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	// Gets the study group from the database
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson gson = new Gson();
		String groupName = request.getParameter("groupName");
		PrintWriter writer = response.getWriter();
		response.setContentType("text/plain");
		try {
			StudyGroup sg = SQLConnector.getStudyGroup(groupName);
			String responseJSON = gson.toJson(sg);
			writer.println(responseJSON);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}
}

