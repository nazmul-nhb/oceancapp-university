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
			<div className="bg-bannerBG bg-cover bg-no-repeat bg-bottom shadow-oceancapp-primary shadow-lg rounded-lg p-8 mb-12 space-y-6">
				{/* Registration & Search/Filter Banner */}
				<div className="w-full lg:w-4/5 flex flex-col gap-6 items-center justify-center mx-auto">
					<h3 className="text-xl sm:text-2xl font-semibold font-kreonSerif text-white text-center">
						Enroll in Your Desired Courses
					</h3>
					<EnrollForm
						setCourses={setCourses}
						sortedCourses={sortedCourses}
					/>
				</div>

				{/* Filtering Section */}
				<div className="flex flex-col gap-6 items-center justify-center">
					<h3 className="text-xl sm:text-2xl font-semibold font-kreonSerif text-white text-center">
						Search & Filter Course(s)
					</h3>
					<Form
						size="large"
						className="mb-6 w-full lg:w-4/5 flex flex-col md:flex-row md:gap-6 justify-center items-center"
					>
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
								onChange={(value) =>
									setSelectedDepartment(value)
								}
								className="w-full max-w-md"
								allowClear
								showSearch
								options={uniqueDepartments.map(
									(department) => ({
										label: department,
										value: department,
									})
								)}
							/>
						</Form.Item>

						{/* Filter by professor */}
						<Form.Item name="professor" className="w-full">
							<Select
								id="professor"
								suffixIcon={<BookOutlined />}
								placeholder="Filter Course by Professor"
								value={selectedProfessor}
								onChange={(value) =>
									setSelectedProfessor(value)
								}
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
				</div>
			</div>

			<h3 className="text-xl sm:text-2xl font-semibold font-kreonSerif text-white text-center mb-6">
				Available Courses to Enroll: {sortedCourses.length}
			</h3>
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
