package Chat;
import com.google.gson.annotations.*;

public class Message {
	@SerializedName("message")
	@Expose
	private String message;
	@SerializedName("fname")
	@Expose
	private String fname;
	@SerializedName("lname")
	@Expose
	private String lname;
	@SerializedName("user_id")
	@Expose
	private Integer user_id;
	@SerializedName("username")
	@Expose
	private String username;
	
	public Integer getUser_id() {
		return user_id;
	}
	
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getfname() {
		return fname;
	}
	
	public void setfname(String fname) {
		this.fname = fname;
	}
	
	public String getlname() {
		return lname;
	}
	
	public void setlname(String lname) {
		this.fname = lname;
	}
	
}
