package StudyGroup;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import util.JDBCConnector;
import util.User;



/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		
		
		StringBuffer inputString = new StringBuffer();
		String line = null;
		
		User newuser = new User();

		
		try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      inputString.append(line);
		  } catch (Exception e) { }

		  try {
			 Gson gson = new Gson();
			 newuser = gson.fromJson(inputString.toString(), User.class);
			 
		     
		     out.print(JDBCConnector.registerUser(newuser));
			 
		  } catch (JsonParseException jse) {
			  System.out.println("JsonParseException: " + jse.getMessage());	
		  }
		  
		
		
		  response.setHeader("Access-Control-Allow-Origin", "*");
		  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		  response.setHeader("Access-Control-Allow-Headers", "Content-Type");



        
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.setStatus(HttpServletResponse.SC_OK);
	    response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
	}
	
		

}


