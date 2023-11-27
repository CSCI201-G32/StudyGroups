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
import util.PostReq;



/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		
		
		StringBuffer inputString = new StringBuffer();
		String line = null;
		String password;
		String username;
		
		try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      inputString.append(line);
		  } catch (Exception e) { }

		  try {
			 Gson gson = new Gson();
			 PostReq postReq = gson.fromJson(inputString.toString(), PostReq.class);
			 username = postReq.getUsername();
			 password = postReq.getPassword();
			 
		     
		     out.print(JDBCConnector.checkLogin(username,password));
			 
		  } catch (JsonParseException jse) {
			  System.out.println("JsonParseException: " + jse.getMessage());	
		  }
		  
		
		
	    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");



        
	}
	
		

}

