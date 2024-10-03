import React from "react";
import { studentData } from "../data/students";
import { formatDate } from "../utilities/utilities";

const StudentPortal: React.FC = () => {
	const {
		name,
		studentId,
		studentImage,
		admissionDate,
		currentSemester,
		expectedGraduationDate,
		courses,
		upcomingEvents,
	} = studentData;

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<div className="container mx-auto">
				{/* Student Info Card */}
				<div className="bg-oceancapp-secondary/20 shadow-lg rounded-lg p-5 flex items-center mb-8">
					<img
						src={studentImage}
						alt={`${name}'s profile`}
						className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
					/>
					<div>
						<h1 className="text-2xl font-semibold">{name}</h1>
						<p className="text-gray-600">Student ID: {studentId}</p>
						<p className="text-gray-600">
							Admission Date: {formatDate(admissionDate)}
						</p>
						<p className="text-gray-600">
							Current Semester: {currentSemester}
						</p>
						<p className="text-gray-600">
							Expected Graduation:{" "}
							{formatDate(expectedGraduationDate)}
						</p>
					</div>
				</div>

				{/* Courses Section */}
				<h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
				<div className="bg-white shadow-lg rounded-lg p-5 mb-8">
					{courses.map((course) => (
						<div
							key={course.courseId}
							className="border-b border-gray-300 py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
						>
							<h3 className="text-lg font-medium">
								{course.courseName}
							</h3>
							<p className="text-gray-600">
								Professor: {course.professorName}
							</p>
							<p className="text-gray-600">
								Grade: {course.grade}
							</p>
						</div>
					))}
				</div>

				{/* Upcoming Events Section */}
				<h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
				<div className="bg-white shadow-lg rounded-lg p-5">
					{upcomingEvents.map((event) => (
						<div
							key={event.eventId}
							className="border-b border-gray-300 py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
						>
							<h3 className="text-lg font-medium">
								{event.title}
							</h3>
							<p className="text-gray-600">
								{new Date(event.date).toLocaleDateString()}
							</p>
							<p className="text-gray-600">{event.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StudentPortal;
