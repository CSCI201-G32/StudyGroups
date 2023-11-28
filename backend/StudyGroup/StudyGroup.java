package StudyGroup;

import java.util.ArrayList;

class MeetingTime {
	private String day;
	private String time;
	public MeetingTime(String day, String time) {
		this.day = day;
		this.time = time;
	}
	
	public String getDay() {
		return day;
	}
	
	public String getTime() {
		return time;
	}
}

public class StudyGroup {
	
	private String groupName;
	private String location;
	private ArrayList<MeetingTime> meetingTimes;
	private String accessCode;
	private String privacy;
	private ArrayList<String> courses;
	private ArrayList<Integer> users;
	
	public StudyGroup() {
		groupName = null;
		location = null;
		meetingTimes = null;
		accessCode = null;
		privacy = null;
		courses = null;
		users = null;
	}
	
	public StudyGroup(String groupName, ArrayList<String> courses, ArrayList<MeetingTime> meetingTimes, String location, String privacy, String accessCode) {
		this.groupName = groupName;
		this.courses = courses;
		this.meetingTimes = meetingTimes;
		this.location = location;
		this.privacy = privacy;
		this.accessCode = accessCode;
	}
	
	public StudyGroup(String groupName, ArrayList<String> courses, ArrayList<MeetingTime> meetingTimes, String location, String privacy, String accessCode, ArrayList<Integer> users) {
		this.groupName = groupName;
		this.courses = courses;
		this.meetingTimes = meetingTimes;
		this.location = location;
		this.privacy = privacy;
		this.accessCode = accessCode;
		this.users = users;
	}
	
	public String getGroupName() {
		return groupName;
	}
	
	public String getLocation() {
		return location;
	}
	
	public ArrayList<MeetingTime> getMeetingTimes() {
		return meetingTimes;
	}
	
	public String getAccessCode() {
		return accessCode;
	}
	
	public String getPrivacy() {
		return privacy;
	}
	
	public ArrayList<String> getCourses() {
		return courses;
	}
	
	public void setUsers(ArrayList<Integer> users) {
		this.users = users;
	}
	
	public ArrayList<Integer> getUsers() {
		return users;
	}
}