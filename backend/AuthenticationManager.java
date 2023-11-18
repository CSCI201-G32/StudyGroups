// Must be included with StudyGroup class

import java.util.ArrayList;
import java.util.HashMap;

public class AuthenticationManager {
	private ArrayList<StudyGroup> studyGroups;
	private ArrayList<String> usedAccessCodes;
	
	public AuthenticationManager() {
		studyGroups = new ArrayList<StudyGroup>();
		usedAccessCodes = new ArrayList<String>();
	}
	
	
	public void setStudyGroups() {
		return;
	}
	
	// Adds the group to the studyGroups ArrayList and generates an access code for it
	// The code is six letters and is guaranteed to be unique
	public String addGroup(StudyGroup sg) {
		boolean uniqueCodeGenerated = false;
		String accessCode = "";
		while (!uniqueCodeGenerated) {
			accessCode = "";
			for (int i = 0; i < 6; i++) {
				accessCode += (char)(26 * Math.random() + 65);
			}
			for (int i = 0; i <= usedAccessCodes.size(); i++) {
				if (i >= usedAccessCodes.size()) {
					uniqueCodeGenerated = true;
				} else if (usedAccessCodes.get(i).equals(accessCode)) {
					uniqueCodeGenerated = false;
					break;
				}
			}
		}
		studyGroups.add(sg);
		usedAccessCodes.add(accessCode);
		return accessCode;
	}
	
	// Checks if an access code is valid for the study group
	public boolean validateCode(StudyGroup sg, String accessCode) {
		return sg.getAccessCode().equals(accessCode);
	}

}
