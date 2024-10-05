import React, { useEffect, useState } from "react";
import { studentData } from "../data/students";
import { formatDate } from "../utilities/utilities";
import StudentTabs from "../components/StudentTabs";
import { Helmet } from "react-helmet-async";
import { getRegisteredCourses } from "../utilities/localStorage";
import type { CourseReg } from "../types/interfaces";
import { coursesData } from "../data/courses";

const StudentPortal: React.FC = () => {
	const {
		studentName: name,
		studentId,
		studentImage,
		admissionDate,
		currentSemester,
		expectedGraduationDate,
		currentCourses,
		finishedCourses,
		upcomingEvents,
	} = studentData;

	const [enrolledCourses, setEnrolledCourses] =
		useState<CourseReg[]>(currentCourses);

	// Get registered course ids from local storage if registered from the enrollment page
	useEffect(() => {
		const registeredIds = getRegisteredCourses();

		if (registeredIds.length) {
			// Filter for courses that are of type CourseReg
			const registeredCourses = coursesData.filter((course) =>
				registeredIds.includes(course.courseId)
			);

			setEnrolledCourses(registeredCourses);
		}
	}, [currentCourses]);

	return (
		<section className="min-h-[calc(100vh-64px)] p-8">
			<Helmet>
				<title>Student Portal - OceanCapp University</title>
			</Helmet>
			<div className="container mx-auto">
				{/* Student Info Card */}
				<div className="bg-oceancapp-secondary/30 shadow-lg rounded-lg p-5 flex items-center mb-8">
					<img
						src={studentImage}
						alt={`${name}'s profile`}
						className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
					/>
					<div className="text-gray-200">
						<h1 className="text-2xl font-semibold">{name}</h1>
						<p>Student ID: {studentId}</p>
						<p>Admission Date: {formatDate(admissionDate)}</p>
						<p>Current Semester: {currentSemester}</p>
						<p>
							Expected Graduation:{" "}
							{formatDate(expectedGraduationDate)}
						</p>
					</div>
				</div>

				<StudentTabs
					currentCourses={enrolledCourses}
					finishedCourses={finishedCourses}
					upcomingEvents={upcomingEvents}
				/>
			</div>
		</section>
	);
};

export default StudentPortal;
