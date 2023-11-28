package StudyGroup;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
        String location = request.getParameter("location");
        String privacy = request.getParameter("privacy");
        String code = request.getParameter("code");
        
        String[] courses = gson.fromJson(request.getParameter("courses"), String[].class);
        MeetingTime[] meetingTimes = gson.fromJson(request.getParameter("meetingTimes"), MeetingTime[].class);
        
		String responseJSON = "";
        
        
		PrintWriter writer = response.getWriter();
		response.setContentType("text/plain");
	    response.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for now
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		try {
			
	        if (groupName == null && location == null && privacy == null && courses == null && meetingTimes == null) {
				// Returns all study groups if parameters are null
	        	ArrayList<StudyGroup> studyGroups = SQLConnector.getAllStudyGroups();
	        	
				responseJSON = gson.toJson(studyGroups);
				System.out.println(responseJSON);
	        } else {
				// Otherwise returns study group based on the parameters
	        	ArrayList<String> coursesList = new ArrayList<>();
	        	if (courses != null) {
	        	    Collections.addAll(coursesList, courses);
	        	}

	        	ArrayList<MeetingTime> meetingTimesList = new ArrayList<>();
	        	if (meetingTimes != null) {
	        	    Collections.addAll(meetingTimesList, meetingTimes);
	        	}
	        	StudyGroup parameters = new StudyGroup(groupName, coursesList, meetingTimesList, location, privacy, code);
				ArrayList<StudyGroup> studyGroups = SQLConnector.getStudyGroup(parameters);
				
				responseJSON = gson.toJson(studyGroups);
				System.out.println(responseJSON);
	        }
	        writer.println(responseJSON);
			writer.flush();
			writer.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}
}

