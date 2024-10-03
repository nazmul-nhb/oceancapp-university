import { Faculty } from "../types/interfaces";

export const facultyList: Faculty[] = [
	{
		facultyId: "f001",
		name: "Dr. Alan Turing",
		designation: "Professor",
		subjects: ["Introduction to Computer Science", "Algorithms"],
		officeHours: "Mon, Wed 10:00 AM - 12:00 PM",
		contactEmail: "atur@oceancapp.uni.edu",
	},
	{
		facultyId: "f002",
		name: "Dr. Ada Lovelace",
		designation: "Associate Professor",
		subjects: ["Calculus II", "Linear Algebra"],
		officeHours: "Tue, Thu 11:00 AM - 1:00 PM",
		contactEmail: "ada@oceancapp.uni.edu",
	},
	{
		facultyId: "f003",
		name: "Dr. Isaac Newton",
		designation: "Assistant Professor",
		subjects: ["General Physics", "Classical Mechanics"],
		officeHours: "Fri 2:00 PM - 4:00 PM",
		contactEmail: "inewton@oceancapp.uni.edu",
	},
	{
		facultyId: "f004",
		name: "Dr. Marie Curie",
		designation: "Professor",
		subjects: ["Nuclear Physics", "Chemistry"],
		officeHours: "Mon, Wed, Fri 9:00 AM - 11:00 AM",
		contactEmail: "mcurie@oceancapp.uni.edu",
	},
];
