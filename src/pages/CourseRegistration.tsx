import React, { useEffect, useMemo, useState } from "react";
import type { Course } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Helmet } from "react-helmet-async";
import { getRegisteredCourses } from "../utilities/localStorage";
import { studentData } from "../data/students";
import Courses from "../components/Courses";
import { Form, Input, Select, Spin, Flex, Button } from "antd";
import {
	BookOutlined,
	SearchOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";
import EnrollModal from "../components/EnrollModal";

const CourseRegistration: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
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

	// Get registered courses from local storage
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
			.includes(searchTerm.trim().toLowerCase());
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

	// Function to handle opening the modal
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Enroll in Courses - OceanCapp University</title>
			</Helmet>

			{/* Search/Filter Banner */}
			<div className="bg-bannerBG bg-cover bg-no-repeat shadow-oceancapp-primary shadow-lg rounded-lg p-8 mb-12 space-y-10">
				<div className="flex items-center justify-center">
					{/* Enroll Now Button */}
					<Button
						className="text-lg font-bold font-kreonSerif animate-bounce hover:animate-none"
						size="large"
						onClick={handleOpenModal}
						type="dashed"
					>
						Enroll Now!
					</Button>
				</div>
				{/* Search/Filter Starts */}
				<h3 className="text-xl sm:text-2xl font-semibold font-kreonSerif text-white text-center">
					Search & Filter Course(s)
				</h3>
				<Form
					size="large"
					className="mb-6 flex flex-col md:flex-row md:gap-6 justify-center items-center"
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
					<Form.Item name="professor" className="w-full">
						<Select
							id="professor"
							suffixIcon={<BookOutlined />}
							placeholder="Filter Course by Professor"
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
			</div>

			{/* Modal to Show Enrollment Form */}
			<EnrollModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				setCourses={setCourses}
				sortedCourses={sortedCourses}
			/>

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
