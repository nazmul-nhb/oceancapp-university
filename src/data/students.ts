import type { StudentData } from "../types/interfaces";

export const studentData: StudentData = {
	studentName: "Nazmul Hassan",
	studentId: "20230118",
	studentEmail: "nazmulnhb@oceancapp.uni.edu",
	studentImage:
		"https://live.staticflickr.com/65535/53828051891_eb9abba4f9_o.jpg",
	admissionDate: new Date("2022-09-01"),
	currentSemester: "Fall 2024",
	expectedGraduationDate: new Date("2026-08-31"),
	currentCourses: [
		{
			courseId: "CS101",
			courseName: "Introduction to Computer Science",
			professorName: "Dr. Alan Turing",
			professorEmail: "atur@oceancapp.uni.edu",
			credits: 3,
			duration: "4 months",
		},
		{
			courseId: "MATH220",
			courseName: "Calculus II",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			credits: 4,
			duration: "4 months",
		},
		{
			courseId: "PHY111",
			courseName: "General Physics",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			credits: 3,
			duration: "4 months",
		},
	],
	finishedCourses: [
		// Fall 2022
		{
			courseId: "CS100",
			courseName: "Introduction to Programming",
			professorName: "Dr. Grace Hopper",
			professorEmail: "ghopper@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Fall 2022",
			duration: "4 months",
		},
		{
			courseId: "MATH101",
			courseName: "Calculus I",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			grade: "A-",
			credits: 4,
			semester: "Fall 2022",
			duration: "4 months",
		},
		{
			courseId: "ENG101",
			courseName: "English Composition",
			professorName: "Dr. William Shakespeare",
			professorEmail: "wshakespeare@oceancapp.uni.edu",
			grade: "B+",
			credits: 3,
			semester: "Fall 2022",
			duration: "4 months",
		},
		{
			courseId: "PHY101",
			courseName: "Physics I",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Fall 2022",
			duration: "4 months",
		},
		// Spring 2023
		{
			courseId: "HIST101",
			courseName: "World History I",
			professorName: "Dr. Edward Said",
			professorEmail: "aeinstein@oceancapp.uni.edu",
			grade: "A-",
			credits: 3,
			semester: "Spring 2023",
			duration: "4 months",
		},
		{
			courseId: "CS201",
			courseName: "Data Structures",
			professorName: "Dr. Alan Turing",
			professorEmail: "atur@oceancapp.uni.edu",
			grade: "A-",
			credits: 3,
			semester: "Spring 2023",
			duration: "4 months",
		},
		{
			courseId: "MATH102",
			courseName: "Discrete Mathematics",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			grade: "B+",
			credits: 3,
			semester: "Spring 2023",
			duration: "4 months",
		},
		{
			courseId: "PHY102",
			courseName: "Mechanics",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Spring 2023",
			duration: "4 months",
		},
		// Fall 2023
		{
			courseId: "CS301",
			courseName: "Algorithms",
			professorName: "Dr. Alan Turing",
			professorEmail: "atur@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Fall 2023",
			duration: "4 months",
		},
		{
			courseId: "MATH202",
			courseName: "Linear Algebra",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			grade: "A-",
			credits: 4,
			semester: "Fall 2023",
			duration: "4 months",
		},
		{
			courseId: "PHY201",
			courseName: "Electromagnetism",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			grade: "B+",
			credits: 3,
			semester: "Fall 2023",
			duration: "4 months",
		},
		{
			courseId: "ENG202",
			courseName: "Technical Writing",
			professorName: "Dr. William Shakespeare",
			professorEmail: "wshakespeare@oceancapp.uni.edu",
			grade: "A-",
			credits: 3,
			semester: "Fall 2023",
			duration: "4 months",
		},
		// Spring 2024
		{
			courseId: "CS302",
			courseName: "Operating Systems",
			professorName: "Dr. Alan Turing",
			professorEmail: "atur@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Spring 2024",
			duration: "4 months",
		},
		{
			courseId: "MATH222",
			courseName: "Probability and Statistics",
			professorName: "Dr. Ada Lovelace",
			professorEmail: "ada@oceancapp.uni.edu",
			grade: "A-",
			credits: 4,
			semester: "Spring 2024",
			duration: "4 months",
		},
		{
			courseId: "PHY203",
			courseName: "Thermodynamics",
			professorName: "Dr. Isaac Newton",
			professorEmail: "inewton@oceancapp.uni.edu",
			grade: "A-",
			credits: 3,
			semester: "Spring 2024",
			duration: "4 months",
		},
		{
			courseId: "CS303",
			courseName: "Database Management Systems",
			professorName: "Dr. Grace Hopper",
			professorEmail: "ghopper@oceancapp.uni.edu",
			grade: "A",
			credits: 3,
			semester: "Spring 2024",
			duration: "4 months",
		},
	],
	upcomingEvents: [
		// October 2024
		{
			eventId: "event1",
			title: "Mid-Term Exam",
			date: new Date("2024-10-15"),
			description: "Mid-term exams for all courses.",
		},
		{
			eventId: "event4",
			title: "Group Project",
			date: new Date("2024-10-20"),
			description: "Present your group project for the semester.",
		},
		{
			eventId: "event5",
			title: "Career Fair",
			date: new Date("2024-10-25"),
			description:
				"Meet potential employers and explore internship opportunities.",
		},

		// November 2024
		{
			eventId: "event2",
			title: "Project Submit",
			date: new Date("2024-11-10"),
			description: "Submit the final project for CS101.",
		},
		{
			eventId: "event6",
			title: "Thanksgiving Break",
			date: new Date("2024-11-22"),
			description: "Enjoy a break for the Thanksgiving holiday.",
		},
		{
			eventId: "event7",
			title: "Review Sessions",
			date: new Date("2024-11-29"),
			description: "Attend review sessions before finals week.",
		},

		// December 2024
		{
			eventId: "event3",
			title: "Hackathon Event",
			date: new Date("2024-12-01"),
			description: "Participate in the University Hackathon.",
		},
		{
			eventId: "event8",
			title: "Final Exams",
			date: new Date("2024-12-09"),
			description: "Final exams for all courses.",
		},
		{
			eventId: "event9",
			title: "Winter Break",
			date: new Date("2024-12-20"),
			description: "Enjoy the winter break until the new semester.",
		},

		// January 2025
		{
			eventId: "event10",
			title: "Spring Semester",
			date: new Date("2025-01-10"),
			description: "Start of the Spring semester classes.",
		},
		{
			eventId: "event11",
			title: "Guest Lecture",
			date: new Date("2025-01-15"),
			description: "Attend a guest lecture from industry leaders.",
		},
		{
			eventId: "event12",
			title: "Org Fair",
			date: new Date("2025-01-25"),
			description: "Join student organizations and clubs.",
		},

		// February 2025
		{
			eventId: "event13",
			title: "Exam Prep",
			date: new Date("2025-02-12"),
			description: "Prepare for midterm exams with study groups.",
		},
		{
			eventId: "event14",
			title: "Career Workshop",
			date: new Date("2025-02-20"),
			description: "Learn resume building and interview skills.",
		},
		{
			eventId: "event15",
			title: "Social Event",
			date: new Date("2025-02-14"),
			description: "Social event to celebrate Valentine's Day.",
		},

		// March 2025
		{
			eventId: "event16",
			title: "Midterm Exams",
			date: new Date("2025-03-03"),
			description: "Midterm exams for the Spring semester.",
		},
		{
			eventId: "event17",
			title: "Spring Break",
			date: new Date("2025-03-15"),
			description: "A week-long break for Spring vacation.",
		},
		{
			eventId: "event18",
			title: "Advising Week",
			date: new Date("2025-03-25"),
			description: "Meet with academic advisors for course planning.",
		},

		// April 2025
		{
			eventId: "event19",
			title: "Project Present",
			date: new Date("2025-04-10"),
			description: "Present your final project for the semester.",
		},
		{
			eventId: "event20",
			title: "Earth Day",
			date: new Date("2025-04-22"),
			description: "Participate in activities to promote sustainability.",
		},
		{
			eventId: "event21",
			title: "Study Break",
			date: new Date("2025-04-28"),
			description: "Relax and recharge before finals week.",
		},

		// May 2025
		{
			eventId: "event22",
			title: "Final Exams",
			date: new Date("2025-05-05"),
			description: "Final exams for all courses.",
		},
		{
			eventId: "event23",
			title: "Graduation Day",
			date: new Date("2025-05-15"),
			description: "Celebrate the graduation of the class of 2025.",
		},
		{
			eventId: "event24",
			title: "Internship Applications",
			date: new Date("2025-05-25"),
			description: "Deadline to apply for summer internships.",
		},

		// June 2025
		{
			eventId: "event25",
			title: "Summer Session",
			date: new Date("2025-06-01"),
			description: "Start of the summer semester.",
		},
		{
			eventId: "event26",
			title: "Summer Social",
			date: new Date("2025-06-15"),
			description: "Join fellow students for a summer social.",
		},
		{
			eventId: "event27",
			title: "Project Due",
			date: new Date("2025-06-25"),
			description: "Submit final projects for summer courses.",
		},

		// July 2025
		{
			eventId: "event28",
			title: "Campus Cleanup",
			date: new Date("2025-07-10"),
			description: "Participate in the annual campus cleanup.",
		},
		{
			eventId: "event29",
			title: "Research Symposium",
			date: new Date("2025-07-20"),
			description: "Present your research at the summer symposium.",
		},
		{
			eventId: "event30",
			title: "Registration Opens",
			date: new Date("2025-07-30"),
			description: "Register for courses for the upcoming fall semester.",
		},
	],
};
