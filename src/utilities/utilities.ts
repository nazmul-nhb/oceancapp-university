import moment from "moment";
import type { Course } from "../types/interfaces";

// Format date to display on the UI
export const formatDate = (date: Date): string => {
	return moment(date).isValid()
		? moment(date).format("MMM DD, YYYY")
		: "Invalid Date";
};

// Format date for calendar
export const formatCalendarDate = (date: Date): string => {
	return moment(date).isValid()
		? moment(date).format("YYYY-MM-DD")
		: "Invalid Date";
};

// Calculate total credits
export const calculateTotalCredits = (courses: Course[]) => {
	const totalCredits = courses.reduce(
		(acc, course) => acc + course.credits,
		0
	);
	return totalCredits;
};
