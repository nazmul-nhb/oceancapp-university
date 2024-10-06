import React, { useEffect, useMemo, useState } from "react";
import type { Course } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Helmet } from "react-helmet-async";
import EnrollForm from "../components/EnrollForm";
import { getRegisteredCourses } from "../utilities/localStorage";
import { studentData } from "../data/students";
import Courses from "../components/Courses";
import { Form, Input, Select, Spin, Flex } from "antd";
import {
	BookOutlined,
	SearchOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";

const CourseRegistration: React.FC = () => {
	const { finishedCourses } = studentData;
	const [courses, setCourses] = useState<Course[]>(coursesData);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
		null
	);
	const [selectedProfessor, setSelectedProfessor] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(false); // Add loading state

	useEffect(() => {
		setLoading(true);
		const registeredCourses = getRegisteredCourses();

		const availableCourses = coursesData.filter((course) => {
			const isRegistered = registeredCourses.includes(course.courseId);
			const isFinished = finishedCourses.some(
				(finishedCourse) => finishedCourse.courseId === course.courseId
			);

			return !isRegistered && !isFinished;
		});

		setCourses(availableCourses);
		setLoading(false);
	}, [finishedCourses]);

	// Filter courses based on search term and selected options
	const filteredCourses = courses.filter((course: Course) => {
		const matchesName = course.courseName
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesDepartment = selectedDepartment
			? course.department === selectedDepartment.trim()
			: true;
		const matchesProfessor = selectedProfessor
			? course.professorName.includes(selectedProfessor.trim())
			: true;

		return matchesName && matchesDepartment && matchesProfessor;
	});

	// Sort the filtered courses alphabetically
	const sortedCourses = useMemo(() => {
		return filteredCourses.sort((a, b) =>
			a.courseName.localeCompare(b.courseName)
		);
	}, [filteredCourses]);

	// Generate unique departments and professors for the select options
	const uniqueDepartments = useMemo(
		() => Array.from(new Set(courses.map((course) => course.department))),
		[courses]
	);

	const uniqueProfessors = useMemo(
		() =>
			Array.from(
				new Set(courses.flatMap((course) => course.professorName))
			).sort(),
		[courses]
	);

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

			{/* Filtering Section */}
			<Form className="mb-6 flex flex-col md:flex-row md:gap-6 justify-center items-center">
				{/* Search by name */}
				<Form.Item name="courseName" className="w-full">
					<Input
						id="courseName"
						suffix={<SearchOutlined />}
						placeholder="Search Course by Course Title"
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full max-w-md"
						allowClear
					/>
				</Form.Item>

				{/* Filter by department */}
				<Form.Item name="department" className="w-full">
					<Select
						id="department"
						suffixIcon={<AppstoreOutlined />}
						placeholder="Filter Course by Department"
						value={selectedDepartment}
						onChange={(value) => setSelectedDepartment(value)}
						className="w-full max-w-md"
						allowClear
						showSearch
						options={uniqueDepartments.map((department) => ({
							label: department,
							value: department,
						}))}
					/>
				</Form.Item>

				{/* Filter by professor */}
				<Form.Item name="subject" className="w-full">
					<Select
						id="subject"
						suffixIcon={<BookOutlined />}
						placeholder="Filter Course by Subject"
						value={selectedProfessor}
						onChange={(value) => setSelectedProfessor(value)}
						className="w-full max-w-md"
						allowClear
						showSearch
						options={uniqueProfessors.map((professor) => ({
							label: professor,
							value: professor,
						}))}
					/>
				</Form.Item>
			</Form>

			{/* Show loading spinner */}
			{loading ? (
				<Flex align="center" justify="center" gap="middle">
					<Spin percent={"auto"} size="large" />
				</Flex>
			) : (
				<Courses isRegister={true} courses={sortedCourses} />
			)}
		</section>
	);
};

export default CourseRegistration;
