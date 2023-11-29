import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import util.JDBCConnector;

@WebServlet("/AccountServlet")
public class AccountServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        	doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
			
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		String userId = request.getParameter("userId");
		
		Gson gson = new Gson();
		
		if(userId == null || userId.isBlank()) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			String error = "User information is missing";
			pw.write(gson.toJson(error));
			pw.flush();
		}
		else {
			List<String> info = new ArrayList<String>();
			try {
				info = JDBCConnector.getUserAccount(userId);
			}
			catch(ClassNotFoundException e) {
				System.out.println(e.getMessage());
			}
			
			if(info.isEmpty()) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				String error = "Failed to get User Info";
				pw.write(gson.toJson(error));
				pw.flush();
			}
			else {
				response.setStatus(HttpServletResponse.SC_OK);
				JsonObject json = new JsonObject();
				json.addProperty("FirstName", info.get(0));
				json.addProperty("LastName", info.get(1));
				json.addProperty("Email", info.get(2));
				json.addProperty("Major", info.get(3));
				
				pw.write(json.toString());
				pw.flush();
			}
		}
			
		
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	}
	
	
}
