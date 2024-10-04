export interface MenuItem {
	key: string;
	icon?: React.ReactNode;
	label: React.ReactNode | string;
	children?: MenuItem[];
}

export interface CourseTaken {
	courseId: string;
	courseName: string;
	professorName: string;
	professorEmail: string;
	grade?: string;
	semester: string;
	credits: number;
	duration: string;
}

export interface CourseReg {
	courseId: string;
	courseName: string;
	professorName: string;
	professorEmail: string;
	credits: number;
	department: string;
	capacity: number;
	enrolled: number;
	duration: string;
}

export interface Event {
	eventId: string;
	title: string;
	date: Date;
	description: string;
}

export interface StudentData {
	name: string;
	studentId: string;
	studentImage: string;
	admissionDate: Date;
	currentSemester: string;
	expectedGraduationDate: Date;
	courses: CourseTaken[];
	finishedCourses: CourseTaken[];
	upcomingEvents: Event[];
}

export interface Faculty {
	facultyId: string;
	name: string;
	designation: string;
	subjects: string[];
	officeHours: string;
	contactEmail: string;
}

export interface RegistrationInfo {
	studentName: string;
	email: string;
	courseIds: string[];
}
