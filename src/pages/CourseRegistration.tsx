import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { CourseReg, RegistrationInfo } from "../types/interfaces";
import { coursesData } from "../data/courses";
import { Helmet } from "react-helmet-async";

const { Option } = Select;

const CourseRegistration: React.FC = () => {
	const [courses, setCourses] = useState<CourseReg[]>(coursesData);
	const [form] = Form.useForm();

	// Sort the courses alphabetically
	const sortedCourses = courses.sort((a, b) => {
		const courseA = a.courseName.toUpperCase();
		const courseB = b.courseName.toUpperCase();
		if (courseA < courseB) {
			return -1;
		}
		if (courseA > courseB) {
			return 1;
		}
		return 0;
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
		message.success(
			`Successfully Enrolled in ${courseIds.length} ${
				courseIds.length === 1 ? "Course" : "Courses"
			}!`
		);

		// Reset the form after submission
		form.resetFields();
	};

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Enroll in Courses - OceanCapp University</title>
			</Helmet>

			<h2 className="text-2xl mb-5">Course Registration</h2>

			{/* Course Registration Form */}
			<Form
				form={form}
				name="courseRegistration"
				layout="vertical"
				onFinish={handleCourseEnrollment}
				scrollToFirstError
			>
				<Form.Item
					name="studentName"
					label="Student Name"
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
					label="Your Email Address"
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
					label="Your Student ID"
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
					label="Select Courses to Enroll"
					rules={[
						{
							required: true,
							validator: (_, value: string[]) => {
								if (!value || value.length === 0) {
									return Promise.reject(
										new Error(
											"Please select at least one course"
										)
									);
								} else if (value.length > 4) {
									return Promise.reject(
										new Error(
											"You can select up to 4 courses only"
										)
									);
								}
								return Promise.resolve();
							},
						},
					]}
				>
					<Select
						id="courses"
						mode="multiple"
						placeholder="Select up to 4 courses"
						allowClear
					>
						{sortedCourses.map((course) => (
							<Option
								key={course.courseId}
								value={course.courseId}
							>
								{course.courseName} - {course.credits} Credits
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Enroll Now
					</Button>
				</Form.Item>
			</Form>

			<h3 className="text-xl mt-10 mb-3">Available Courses</h3>
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
