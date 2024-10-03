import { CourseRegistration } from "../types/interfaces";

export const availableCourses: CourseRegistration[] = [
	{
		courseId: "CS101",
		courseName: "Introduction to Computer Science",
		credits: 3,
		department: "Computer Science",
		semester: "Fall 2024",
		capacity: 50,
		enrolled: 45,
	},
	{
		courseId: "MATH220",
		courseName: "Calculus II",
		credits: 4,
		department: "Mathematics",
		semester: "Fall 2024",
		capacity: 60,
		enrolled: 60,
	},
	{
		courseId: "PHY111",
		courseName: "General Physics",
		credits: 3,
		department: "Physics",
		semester: "Fall 2024",
		capacity: 40,
		enrolled: 30,
	},
	{
		courseId: "CHEM201",
		courseName: "Organic Chemistry",
		credits: 4,
		department: "Chemistry",
		semester: "Fall 2024",
		capacity: 40,
		enrolled: 35,
	},
];
