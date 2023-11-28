
import java.util.ArrayList;

import com.google.gson.Gson;

import java.util.*;
import java.io.*;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



@WebServlet("/StudyGroupCreateServlet")
public class StudyGroupCreateServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
	}

	// Adds the study group to the database
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson gson = new Gson();
		String groupName = request.getParameter("groupName");
        String location = request.getParameter("location");
        String privacy = request.getParameter("privacy");
        String code = request.getParameter("code");
        
        String[] courses = gson.fromJson(request.getParameter("courses"), String[].class);
        MeetingTime[] meetingTimes = gson.fromJson(request.getParameter("meetingTimes"), MeetingTime[].class);
        
        
        StudyGroup sg = new StudyGroup(groupName, new ArrayList<>(Arrays.asList(courses)), new ArrayList<>(Arrays.asList(meetingTimes)), location, privacy, code);
		PrintWriter writer = response.getWriter();
		response.setContentType("text/plain");
	    response.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for now
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		try {
			int studyGroupID = SQLConnector.insertStudyGroup(sg);
			writer.println(studyGroupID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}
}