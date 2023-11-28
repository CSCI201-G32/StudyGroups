import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import util.JDBCConnector;



/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/UserUtil")
public class UserUtil extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		
		response.setContentType("text/plain");
		StringBuffer inputString = new StringBuffer();
		String line = null;
		Integer userID;
		
		try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      inputString.append(line);
		  } catch (Exception e) { }
		
		
		userID = Integer.parseInt(inputString.toString());
		
		List<String> userinfoList = new ArrayList<String>();
		try {
			userinfoList = JDBCConnector.getUserInfo(userID);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String firstName = userinfoList.get(0);
		String lastName = userinfoList.get(1);
		
		/* Now send back the information to the frontend in JSON format like this.
		{
		 
		    "firstName": "John",
		    "lastName": "Doe"
		}
		*/
		
		 out.print("{\"firstName\":\"" + firstName + "\",\"lastName\":\"" + lastName + "\"}");
		  
		
		//response.setStatus(HttpServletResponse.SC_OK);
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

