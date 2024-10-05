import React, { useEffect, useState } from "react";
import { studentData } from "../data/students";
import { formatDate } from "../utilities/utilities";
import StudentTabs from "../components/StudentTabs";
import { Helmet } from "react-helmet-async";
import { getRegisteredCourses } from "../utilities/localStorage";
import type { CourseReg } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Image, Card } from "antd";
import {
	CalendarOutlined,
	FieldTimeOutlined,
	IdcardOutlined,
	UserOutlined,
} from "@ant-design/icons";

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
			// Filter for courses that are registered from the enrollment page
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
				<div className="bg-bannerBG bg-cover bg-no-repeat shadow-lg rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 mb-8">
					<Image
						width={180}
						src={studentImage}
						alt={`${name}'s profile`}
						className="w-24 h-24 rounded-full border-2 p-1 border-gray-300"
					/>
					<Card
						className="bg-oceancapp-primary text-white"
						title={
							<span style={{ color: "white", fontSize: "18px" }}>
								<UserOutlined style={{ marginRight: 8 }} />
								{name}
							</span>
						}
						bordered={false}
					>
						<p>
							<IdcardOutlined style={{ marginRight: 6 }} />
							<span>Student ID: {studentId}</span>
						</p>
						<p>
							<CalendarOutlined style={{ marginRight: 6 }} />
							Admission Date: {formatDate(admissionDate)}
						</p>
						<p>
							<FieldTimeOutlined style={{ marginRight: 6 }} />
							Current Semester: {currentSemester}
						</p>
						<p>
							<CalendarOutlined style={{ marginRight: 6 }} />
							Expected Graduation:{" "}
							{formatDate(expectedGraduationDate)}
						</p>
					</Card>
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
