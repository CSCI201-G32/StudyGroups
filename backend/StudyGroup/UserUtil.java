package StudyGroup;

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
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");

        StringBuffer inputString = new StringBuffer();
        String line = null;
        List<Integer> userIDs = new ArrayList<>();

        try {
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                inputString.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String[] idStrings = inputString.toString().split(",");
        for (String idString : idStrings) {
            try {
                userIDs.add(Integer.parseInt(idString.trim()));
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }

        List<String> userNames = new ArrayList<>();
        for (Integer userID : userIDs) {
            try {
                List<String> userInfoList = JDBCConnector.getUserInfo(userID);
                if (userInfoList.size() >= 2) {
                    String firstName = userInfoList.get(0);
                    String lastName = userInfoList.get(1);
                    userNames.add(firstName + " " + lastName);
                }
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }

        StringBuilder jsonResponse = new StringBuilder();
        jsonResponse.append("[");
        for (int i = 0; i < userNames.size(); i++) {
            jsonResponse.append("\"" + userNames.get(i) + "\"");
            if (i < userNames.size() - 1) {
                jsonResponse.append(",");
            }
        }
        jsonResponse.append("]");

        out.print(jsonResponse.toString());

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

