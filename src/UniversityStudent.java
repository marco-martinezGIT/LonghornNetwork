import java.util.*;

public class UniversityStudent extends Student {
    public UniversityStudent roommate;
    public List<String> friendList;
    public Map<String, List<String>> chatHistory;

    public UniversityStudent(String name, int age, String gender, int year, String major,
                              double gpa, List<String> roommatePreferences,
                              List<String> previousInternships) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.year = year;
        this.major = major;
        this.gpa = gpa;
        this.roommatePreferences = new ArrayList<>(roommatePreferences);
        this.previousInternships = new ArrayList<>(previousInternships);
        this.friendList = new ArrayList<>();
        this.chatHistory = new HashMap<>();
        this.roommate = null;
    }

    public UniversityStudent getRoommate() {
        return roommate;
    }

    public void setRoommate(UniversityStudent r) {
        this.roommate = r;
    }

    @Override
    public int calculateConnectionStrength(Student other) {
        if (!(other instanceof UniversityStudent)) return 0;
        UniversityStudent o = (UniversityStudent) other;
        int strength = 0;

        if (this.roommate != null && this.roommate == o) {
            strength += 4;
        }

        for (String internship : this.previousInternships) {
            if (!internship.equals("None") && o.previousInternships.contains(internship)) {
                strength += 3;
            }
        }

        if (this.major != null && this.major.equals(o.major)) {
            strength += 2;
        }

        if (this.age == o.age) {
            strength += 1;
        }

        return strength;
    }

    public synchronized void addFriend(UniversityStudent student) {
        if (!friendList.contains(student.name)) {
            friendList.add(student.name);
        }
    }

    public synchronized void addChat(String otherName, String message) {
        if (!chatHistory.containsKey(otherName)) {
            chatHistory.put(otherName, new ArrayList<>());
        }
        chatHistory.get(otherName).add(message);
    }

    @Override
    public String toString() {
        return "UniversityStudent{name='" + name + "', age=" + age + ", gender='" + gender +
               "', year=" + year + ", major='" + major + "', GPA=" + gpa +
               ", roommatePreferences=" + roommatePreferences +
               ", previousInternships=" + previousInternships + "}";
    }
}
