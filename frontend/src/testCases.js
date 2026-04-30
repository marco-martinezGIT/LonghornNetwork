// Test case data mirrored from Main.java generateTestCase1/2/3

export function getTestCases() {
  return [
    {
      label: "Test Case 1",
      students: [
        { name: "Alice", age: 20, gender: "Female", year: 2, major: "Computer Science", gpa: 3.5, roommatePreferences: ["Bob", "Charlie", "Frank"], previousInternships: ["Google"] },
        { name: "Bob", age: 21, gender: "Male", year: 3, major: "Computer Science", gpa: 3.7, roommatePreferences: ["Alice", "Charlie", "Frank"], previousInternships: ["Google", "Microsoft"] },
        { name: "Charlie", age: 20, gender: "Male", year: 2, major: "Mathematics", gpa: 3.2, roommatePreferences: ["Alice", "Bob", "Frank"], previousInternships: ["None"] },
        { name: "Frank", age: 23, gender: "Male", year: 3, major: "Chemistry", gpa: 3.1, roommatePreferences: ["Alice", "Bob", "Charlie"], previousInternships: [] },
        { name: "Dana", age: 22, gender: "Female", year: 4, major: "Biology", gpa: 3.8, roommatePreferences: ["Evan"], previousInternships: ["Pfizer"] },
        { name: "Evan", age: 22, gender: "Male", year: 4, major: "Biology", gpa: 3.6, roommatePreferences: ["Dana"], previousInternships: ["Moderna", "Pfizer"] }
      ],
      chatSeed: [
        { from: "Alice", to: "Bob", message: "Hello there!" },
        { from: "Bob", to: "Alice", message: "Hi back!" }
      ]
    },
    {
      label: "Test Case 2",
      students: [
        { name: "Greg", age: 24, gender: "Male", year: 4, major: "Economics", gpa: 3.4, roommatePreferences: ["Helen", "Ivy"], previousInternships: ["InternshipA"] },
        { name: "Helen", age: 24, gender: "Female", year: 4, major: "Economics", gpa: 3.5, roommatePreferences: ["Greg", "Ivy"], previousInternships: ["InternshipB"] },
        { name: "Ivy", age: 25, gender: "Female", year: 4, major: "Economics", gpa: 3.8, roommatePreferences: ["Helen", "Greg"], previousInternships: ["DummyCompany"] }
      ],
      chatSeed: [
        { from: "Greg", to: "Helen", message: "Hello there!" },
        { from: "Helen", to: "Greg", message: "Hi back!" }
      ]
    },
    {
      label: "Test Case 3",
      students: [
        { name: "Jack", age: 19, gender: "Male", year: 1, major: "History", gpa: 3.0, roommatePreferences: ["Kim"], previousInternships: ["MuseumIntern"] },
        { name: "Kim", age: 19, gender: "Female", year: 1, major: "History", gpa: 3.2, roommatePreferences: ["Jack"], previousInternships: ["MuseumIntern"] },
        { name: "Leo", age: 20, gender: "Male", year: 1, major: "History", gpa: 3.5, roommatePreferences: [], previousInternships: ["None"] }
      ],
      chatSeed: [
        { from: "Jack", to: "Kim", message: "Hello there!" },
        { from: "Kim", to: "Jack", message: "Hi back!" }
      ]
    }
  ]
}
