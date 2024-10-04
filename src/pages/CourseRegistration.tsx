import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { CourseReg, RegistrationInfo } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Helmet } from "react-helmet-async";
import { DownOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const MAX_COURSE_COUNT = 4;

const CourseRegistration: React.FC = () => {
	const [courses, setCourses] = useState<CourseReg[]>(coursesData);
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

	const [form] = Form.useForm();

	// Sort the courses alphabetically
	const sortedCourses = courses.sort((a, b) => {
		return a.courseName.localeCompare(b.courseName);
	});

	// Function to handle course enrollment form submission
	const handleCourseEnrollment = (regInfo: RegistrationInfo) => {
		const { courseIds } = regInfo;

		// Remove selected courses from the available list
		const updatedCourses = courses.filter(
			(course) => !courseIds.includes(course.courseId)
		);

		setCourses(updatedCourses);

		// Show success message on form submission
		toast.success(
			`Successfully Enrolled in ${courseIds.length} ${
				courseIds.length === 1 ? "Course" : "Courses"
			}!`
		);

		// Reset the form after submission
		form.resetFields();
	};

	const courseOptions = sortedCourses.map((course) => {
		return {
			value: course.courseId,
			label: `${course.courseName} - ${course.credits} Credits`,
		};
	});

	const suffix = (
		<>
			<span>
				{selectedCourses.length} / {MAX_COURSE_COUNT}
			</span>
			<DownOutlined />
		</>
	);

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Enroll in Courses - OceanCapp University</title>
			</Helmet>

			<h2 className="text-2xl mb-5">Course Registration</h2>

			{/* Course Registration Form */}
			<Form
				className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
				form={form}
				name="courseRegistration"
				layout="vertical"
				onFinish={handleCourseEnrollment}
				scrollToFirstError
			>
				<Form.Item
					name="studentName"
					rules={[
						{
							required: true,
							message: "Please enter your name",
						},
					]}
				>
					<Input
						allowClear
						id="studentName"
						placeholder="Enter your full name"
					/>
				</Form.Item>

				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please enter your email",
						},
						{
							type: "email",
							message: "Please enter a valid email",
						},
					]}
				>
					<Input allowClear placeholder="Enter your email" />
				</Form.Item>

				<Form.Item
					name="studentId"
					rules={[
						{
							required: true,
							message: "Please enter your student id",
						},
					]}
				>
					<Input allowClear placeholder="Enter your student id" />
				</Form.Item>

				<Form.Item
					name="courseIds"
					rules={[
						{
							required: true,
							message: "Pleas, select at least 1 course",
						},
					]}
				>
					<Select
						id="courseIds"
						mode="multiple"
						maxCount={MAX_COURSE_COUNT}
						placeholder="Select up to 4 Courses"
						allowClear
						value={selectedCourses}
						onChange={setSelectedCourses}
						suffixIcon={suffix}
						options={courseOptions}
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Enroll Now
					</Button>
				</Form.Item>
			</Form>

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
