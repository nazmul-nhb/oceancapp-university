import moment from "moment";

export const formatDate = (date: Date): string =>
	moment(date).isValid()
		? moment(date).format("MMMM DD, YYYY")
		: "Invalid Date";
