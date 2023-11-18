import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.GsonBuilder;
import java.util.*;
import java.io.*;
import java.lang.Math;

public class Main {

	public static void main(String[] args) {
		
		// This file tests the AuthenticationManager and StudyGroup classes
		// Should be included with those classes in a package
		AuthenticationManager am = new AuthenticationManager();
		String jsonName = "";
		Reader reader = null;
		Scanner fileScan = new Scanner(System.in);
		StudyGroup sg;
		while (true) {
			System.out.print("What is the name of the file? ");
			jsonName = fileScan.nextLine();
			try {
				reader = new FileReader(jsonName);
				Gson gson = new Gson();
				sg = gson.fromJson(reader, StudyGroup.class);
				// Sets the authentcator for the study group
				sg.setAuthenticator(am);
				// Adds the group to the authentication manager and sets the access code
				sg.setAccessCode(am.addGroup(sg));
				System.out.println("The file has been properly read.");
				System.out.println();
				break;
			} catch (FileNotFoundException fnf) {
				System.out.println("File not found");
				System.out.println();
			} catch (JsonSyntaxException e) {
				System.out.println("The file " + jsonName + " is not formatted properly.");
				System.out.println();
			}
		}
		System.out.println(sg);
		fileScan.close();
	}
}