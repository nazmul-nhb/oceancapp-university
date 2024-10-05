import { Card } from "antd";
import React from "react";
import type { CourseFinished } from "../types/interfaces";

interface CoursesProps {
	courses: CourseFinished[];
}

const FinishedCourses: React.FC<CoursesProps> = ({ courses }) => {
	return (
		<div className="">
			{courses.map((course) => (
				<Card key={course.courseId} style={{ margin: "8px 0" }}>
					<strong>{course.courseName}</strong> -{" "}
					{course.professorName} (Grade: {course.grade})
				</Card>
			))}
		</div>
	);
};

export default FinishedCourses;
