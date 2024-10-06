export interface MenuItem {
	key: string;
	icon?: React.ReactNode;
	label: React.ReactNode | string;
	children?: MenuItem[];
}

export interface Course {
	courseId: string;
	courseName: string;
	professorName: string;
	professorEmail: string;
	credits: number;
	duration: string;
	grade?: string;
	semester?: string;
	department?: string;
	capacity?: number;
	enrolled?: number;
}

export interface Event {
	eventId: string;
	title: string;
	date: Date;
	description: string;
}

export interface StudentData {
	studentName: string;
	studentId: string;
	studentEmail: string;
	studentImage: string;
	admissionDate: Date;
	currentSemester: string;
	expectedGraduationDate: Date;
	currentCourses: Course[];
	finishedCourses: Course[];
	upcomingEvents: Event[];
}

export interface Faculty {
	facultyId: string;
	facultyName: string;
	designation: string;
	subjects: string[];
	officeHours: string;
	contactEmail: string;
	gender: "men" | "women";
}

export interface RegistrationInfo {
	studentName: string;
	email: string;
	courseIds: string[];
}
