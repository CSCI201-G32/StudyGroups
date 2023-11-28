

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
	

	public StudyGroup(String groupName, ArrayList<String> courses, ArrayList<MeetingTime> meetingTimes, String location, String privacy, String accessCode) {
		this.groupName = groupName;
		this.courses = courses;
		this.meetingTimes = meetingTimes;
		this.location = location;
		this.privacy = privacy;
		this.accessCode = accessCode;
		
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
}