WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
			
		PrintWriter pw = response.getWriter();
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		
		String param = request.getParameter("param");
		
		Gson gson = new Gson();
		
		if(param == null || param.isBlank()) {
			response.setStatus(HttpServletResponse.SC_OK);
			String answer = "No Results Found";
			pw.print(answer);
			pw.flush();
		}
		else {
			List<String> info = new ArrayList<String>();
			try {
				info = JDBCConnector.getSearch(param);
			}
			catch(ClassNotFoundException e) {
				System.out.println(e.getMessage());
			}
			if(info.isEmpty()) {
				response.setStatus(HttpServletResponse.SC_OK);
				String answer = "No Results Found";
				pw.print(answer);
				pw.flush();
			}
			else {
				response.setStatus(HttpServletResponse.SC_OK);
				for(int i = 0; i < info.size(); i++) {
                    pw.write(info.get(i));
                }
                pw.flush();
			}
		}
			
		
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	}
	
	
}