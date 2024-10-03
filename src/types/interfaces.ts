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
	grade?: string;
	credits: number;
	semester: string;
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
	courses: Course[];
	finishedCourses: Course[];
	upcomingEvents: Event[];
}

export interface CourseRegistration {
	courseId: string;
	courseName: string;
	credits: number;
	department: string;
	semester: string;
	capacity: number;
	enrolled: number;
}

export interface Faculty {
	facultyId: string;
	name: string;
	designation: string;
	subjects: string[];
	officeHours: string;
	contactEmail: string;
}
