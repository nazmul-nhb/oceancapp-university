import React from "react";
import type { CourseReg } from "../types/interfaces";
import { Card } from "antd";

interface CoursesProps {
	courses: CourseReg[];
}

const CurrentCourses: React.FC<CoursesProps> = ({ courses }) => {
	return (
		<div className="">
			{courses.map((course) => (
				<Card key={course.courseId} style={{ margin: "8px 0" }}>
					<strong>{course.courseName}</strong> -{" "}
					{course.professorName} ({course.credits} credits)
				</Card>
			))}
		</div>
	);
};

export default CurrentCourses;
