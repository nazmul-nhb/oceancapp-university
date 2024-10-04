export const getRegisteredCourses = (): string[] => {
	const savedCourses = localStorage.getItem("registered");
	if (savedCourses) {
		return JSON.parse(savedCourses) as string[];
	}
	return [];
};

export const saveRegisteredCourses = (id: string) => {
	const savedCourses = getRegisteredCourses();

	savedCourses.push(id);

	localStorage.setItem("registered", JSON.stringify(savedCourses));
};
