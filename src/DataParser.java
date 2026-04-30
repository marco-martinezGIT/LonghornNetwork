import java.io.*;
import java.util.*;

public class DataParser {

    public static List<UniversityStudent> parseStudents(String filename) throws IOException {
        List<UniversityStudent> students = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String line;

        String name = null;
        Integer age = null;
        String gender = null;
        Integer year = null;
        String major = null;
        Double gpa = null;
        List<String> roommatePrefs = null;
        List<String> internships = null;
        boolean inStudent = false;

        while ((line = reader.readLine()) != null) {
            line = line.trim();

            if (line.equals("Student:")) {
                if (inStudent && name != null) {
                    if (roommatePrefs == null) {
                        System.out.println("Parsing error: Missing required field 'RoommatePreferences' in student entry for " + name + ".");
                        reader.close();
                        return students;
                    }
                    if (internships == null) {
                        System.out.println("Parsing error: Missing required field 'PreviousInternships' in student entry for " + name + ".");
                        reader.close();
                        return students;
                    }
                    students.add(new UniversityStudent(name, age, gender, year, major, gpa, roommatePrefs, internships));
                }
                name = null; age = null; gender = null; year = null;
                major = null; gpa = null; roommatePrefs = null; internships = null;
                inStudent = true;
                continue;
            }

            if (line.isEmpty()) continue;

            if (!line.contains(":")) {
                System.out.println("Parsing error: Incorrect format in line: '" + line + "'. Expected format 'Name: <value>'.");
                reader.close();
                return students;
            }

            int colonIdx = line.indexOf(':');
            String key = line.substring(0, colonIdx).trim();
            String value = line.substring(colonIdx + 1).trim();

            if (key.equals("Name")) {
                name = value;
            } else if (key.equals("Age")) {
                try {
                    age = Integer.parseInt(value);
                } catch (NumberFormatException e) {
                    System.out.println("Number format error: Invalid number format for age: '" + value + "' in student entry for " + name + ".");
                    reader.close();
                    return students;
                }
            } else if (key.equals("Gender")) {
                gender = value;
            } else if (key.equals("Year")) {
                try {
                    year = Integer.parseInt(value);
                } catch (NumberFormatException e) {
                    System.out.println("Number format error: Invalid number format for year: '" + value + "' in student entry for " + name + ".");
                    reader.close();
                    return students;
                }
            } else if (key.equals("Major")) {
                major = value;
            } else if (key.equals("GPA")) {
                try {
                    gpa = Double.parseDouble(value);
                } catch (NumberFormatException e) {
                    System.out.println("Number format error: Invalid number format for GPA: '" + value + "' in student entry for " + name + ".");
                    reader.close();
                    return students;
                }
            } else if (key.equals("RoommatePreferences")) {
                roommatePrefs = new ArrayList<>();
                if (!value.isEmpty()) {
                    for (String s : value.split(",")) {
                        roommatePrefs.add(s.trim());
                    }
                }
            } else if (key.equals("PreviousInternships")) {
                internships = new ArrayList<>();
                if (!value.isEmpty()) {
                    for (String s : value.split(",")) {
                        internships.add(s.trim());
                    }
                }
            }
        }

        reader.close();

        if (inStudent && name != null) {
            if (roommatePrefs == null) {
                System.out.println("Parsing error: Missing required field 'RoommatePreferences' in student entry for " + name + ".");
                return students;
            }
            if (internships == null) {
                System.out.println("Parsing error: Missing required field 'PreviousInternships' in student entry for " + name + ".");
                return students;
            }
            students.add(new UniversityStudent(name, age, gender, year, major, gpa, roommatePrefs, internships));
        }

        return students;
    }
}
