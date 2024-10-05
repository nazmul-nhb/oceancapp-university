import moment from "moment";

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
