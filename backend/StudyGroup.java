// Must be included with AuthenticationManager class

import java.util.ArrayList;
import java.util.HashMap;

public class StudyGroup {
	private String groupName;
	private String location;
	private ArrayList<HashMap<String, String>> meetingTimes;
	private String accessCode;
	private String privacy;
	private ArrayList<String> courses;
	private AuthenticationManager authenticator;
	

	// Generates the study group with all of the parameters as well as assigning it to the authenticator
	public StudyGroup(AuthenticationManager am, String groupName, String location, String privacy, ArrayList<String> courses) {
		this.courses = courses;
		this.groupName = groupName;
		this.location = location;
		this.privacy = privacy;
		this.accessCode = "";
		this.meetingTimes = new ArrayList<HashMap<String, String>>();
		this.authenticator = am;
		
		// Adds the group to the authenticator and generates the access code
		this.accessCode = authenticator.addGroup(this);
	}
	
	public StudyGroup(AuthenticationManager authenticator, String groupName, String location, String privacy, ArrayList<String> courses, String day, String time) {
		this(authenticator, groupName, location, privacy, courses);
		addMeeting(day, time);
	}
	
	public StudyGroup(AuthenticationManager authenticator) {
		this(authenticator, "", "", "", null);
	}
	
	public void setAuthenticator(AuthenticationManager am) {
		this.authenticator = am;
	}
	
	public AuthenticationManager getAuthenticator() {
		return authenticator;
	}
	
	// Adds a meeting based on the date and time and assigns it to meetingTimes
	public void addMeeting(String day, String time) {
		HashMap<String, String> meeting = new HashMap<String, String>();
		meeting.put("day", day);
		meeting.put("time", time);
		meetingTimes.add(meeting);
	}
	
	public ArrayList<HashMap<String, String>> getMeetings() {
		return this.meetingTimes;
	}
	
	// Finds the meeting based on the date and time.
	// Is called by getMeetingByDate and getMeetingByTime if no date or time are provided.
	public ArrayList<HashMap<String, String>> getMeeting(String date, String time) {
		
		if (date.equals("") && time.equals("")) {
			return getMeetings();
		}
		
		ArrayList<HashMap<String, String>> meetings = new ArrayList<HashMap<String, String>>();
		
		for (int i = 0; i < meetingTimes.size(); i++) {
			boolean validMeeting = false;
			if (meetingTimes.get(i).containsValue(date) && meetingTimes.get(i).containsValue(time)) {
				validMeeting = true;
			} else if (time.equals("") && meetingTimes.get(i).containsValue(date)) {
				validMeeting = true;
			} else if (date.equals("") && meetingTimes.get(i).containsValue(time)) {
				validMeeting = true;
			}
			
			if (validMeeting) {
				meetings.add(meetingTimes.get(i));
			}
		}
		
		return meetingTimes;
	}
	
	public ArrayList<HashMap<String, String>> getMeetingByDate(String date) {
		return getMeeting(date, "");
	}
	
	public ArrayList<HashMap<String, String>> getMeetingByTime(String time) {
		return getMeeting("", time);
	}
	
	public String getAccessCode() {
		return accessCode;
	}
	
	public void setAccessCode(String code) {
		this.accessCode = code;
	}
	
	public String getName() {
		return groupName;
	}
	
	public void setName(String name) {
		this.groupName = name;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getPrivacy() {
		return privacy;
	}
	
	public void setPrivacy(String privacy) {
		this.privacy = privacy;
	}
	
	public String toString() {
		String s1 = "Name: " + groupName + "\n";
		String s2 = "Location: " + location + "\n";
		String s3 = "Access Code: " + accessCode + "\n";
		String s4 = "Privacy: " + privacy + "\n";
		String s5 = "Courses: ";
		for (String s : courses) {
			s5 += s + " ";
		}
		s5 += "\n";
		String s6 = "Meeting Times: ";
		for (HashMap<String, String> hm : meetingTimes) {
			for (HashMap.Entry<String, String> entry : hm.entrySet()) {
				s6 += entry.getKey() + ": " + entry.getValue() + ", "; 
			}
		}
		return s1 + s2 + s3 + s4 + s5 + s6;
	}
}
