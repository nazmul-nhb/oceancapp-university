import { StudentData } from "../types/interfaces";

export const studentData: StudentData = {
	name: "John Doe",
	studentId: "20230123",
	studentImage:
		"https://live.staticflickr.com/65535/54039904455_f0c1a2214c_c.jpg",
	admissionDate: new Date("2022-09-01"),
	currentSemester: "Fall 2024",
	expectedGraduationDate: new Date("2026-06-01"),
	courses: [
		{
			courseId: "CS101",
			courseName: "Introduction to Computer Science",
			professorName: "Dr. Alan Turing",
			professorEmail: "atur@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Fall 2024",
			duration: "4 months",
		},
		{
			courseId: "MATH220",
			courseName: "Calculus II",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			grade: "B+",
			credits: 4,
			semester: "Fall 2024",
			duration: "4 months",
		},
		{
			courseId: "PHY111",
			courseName: "General Physics",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			grade: "A-",
			credits: 3,
			semester: "Fall 2024",
			duration: "4 months",
		},
	],
	upcomingEvents: [
		{
			eventId: "event1",
			title: "Mid-Term Exam",
			date: new Date("2024-10-15"),
			description: "Mid-term exams for all courses.",
		},
		{
			eventId: "event2",
			title: "Project Submission",
			date: new Date("2024-11-10"),
			description: "Submit the final project for CS101.",
		},
		{
			eventId: "event3",
			title: "Hackathon",
			date: new Date("2024-12-01"),
			description: "Participate in the University Hackathon.",
		},
	],
};
