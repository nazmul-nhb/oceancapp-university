import React, { useState } from "react";
import { CourseReg } from "../types/interfaces";
import { coursesData } from "../data/courses";

const CourseRegistration: React.FC = () => {
	const [courses, setCourses] = useState<CourseReg[]>(coursesData);

	const handleDelete = (id: string) => {
		const updatedCourses = courses.filter(
			(course) => course.courseId !== id
		);

		setCourses(updatedCourses);
	};

	console.log(courses.length);

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			{courses.map((course) => (
				<div key={course.courseId}>
					<h3>{course.courseName}</h3>
					<button onClick={() => handleDelete(course.courseId)}>
						Delete
					</button>
				</div>
			))}
		</section>
	);
};

export default CourseRegistration;
