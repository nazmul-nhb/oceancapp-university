import React, { useEffect, useState } from "react";
import type { Course } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Helmet } from "react-helmet-async";
import EnrollForm from "../components/EnrollForm";
import { getRegisteredCourses } from "../utilities/localStorage";
import { studentData } from "../data/students";

const CourseRegistration: React.FC = () => {
	const { finishedCourses } = studentData;
	const [courses, setCourses] = useState<Course[]>(coursesData);

	useEffect(() => {
		// Fetch registered courses each time the the component mounts
		const registeredCourses = getRegisteredCourses();

		// Filter out registered courses and finished courses from the available list
		const availableCourses = coursesData.filter((course) => {
			const isRegistered = registeredCourses.includes(course.courseId);
			const isFinished = finishedCourses.some(
				(finishedCourse) => finishedCourse.courseId === course.courseId
			);

			return !isRegistered && !isFinished;
		});

		setCourses(availableCourses);
	}, [finishedCourses]);

	// Sort the courses alphabetically
	const sortedCourses = courses.sort((a, b) => {
		return a.courseName.localeCompare(b.courseName);
	});

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Enroll in Courses - OceanCapp University</title>
			</Helmet>

			<h2 className="text-2xl mb-5">Course Registration</h2>

			<EnrollForm setCourses={setCourses} sortedCourses={sortedCourses} />

			<h3 className="text-xl mt-10 mb-3">
				Available Courses to Enroll: {sortedCourses.length}
			</h3>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{sortedCourses.map((course) => (
					<div
						key={course.courseId}
						className="mb-3 p-4 border rounded-md hover:bg-gray-100"
					>
						<h4 className="text-lg">{course.courseName}</h4>
						<p>Professor: {course.professorName}</p>
						<p>Credits: {course.credits}</p>
						<p>Department: {course.department}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default CourseRegistration;
