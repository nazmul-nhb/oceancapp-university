import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import { CourseReg, RegistrationInfo } from "../types/interfaces";
import toast from "react-hot-toast";

interface EnrollCourseProps {
	sortedCourses: CourseReg[];
	setCourses: React.Dispatch<React.SetStateAction<CourseReg[]>>;
}

const EnrollForm: React.FC<EnrollCourseProps> = ({
	sortedCourses,
	setCourses,
}) => {
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
	const [form] = Form.useForm();

	const courseOptions = sortedCourses.map((course) => {
		return {
			value: course.courseId,
			label: `${course.courseName} - ${course.credits} Credits`,
		};
	});

	const suffix = (
		<>
			<span>{selectedCourses.length} / 4</span>
			<DownOutlined />
		</>
	);

	// Function to handle course enrollment form submission
	const handleCourseEnrollment = (regInfo: RegistrationInfo) => {
		console.log(regInfo);
		const { courseIds } = regInfo;

		// Remove selected courses from the available list
		const updatedCourses = sortedCourses.filter(
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

	return (
		<>
			{/* Course Registration Form */}
			<Form
				className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
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
					className="md:col-span-2"
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
						maxCount={4}
						placeholder="Select up to 4 Courses"
						allowClear
						value={selectedCourses}
						onChange={setSelectedCourses}
						suffixIcon={suffix}
						options={courseOptions}
						filterOption={(input, option) => {
							// Ensure a boolean return type
							if (!option) return false; // If option is undefined, return false
							return option.label
								.toLowerCase()
								.includes(input.toLowerCase());
						}}
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Enroll Now
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default EnrollForm;
