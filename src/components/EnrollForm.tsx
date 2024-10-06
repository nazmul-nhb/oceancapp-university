import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import type { Course, RegistrationInfo } from "../types/interfaces";
import toast from "react-hot-toast";
import {
	getRegisteredCourses,
	saveRegisteredCourses,
} from "../utilities/localStorage";
import { studentData } from "../data/students";

interface EnrollCourseProps {
	sortedCourses: Course[];
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const EnrollForm: React.FC<EnrollCourseProps> = ({
	sortedCourses,
	setCourses,
}) => {
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
	const { studentName, studentEmail, studentId } = studentData;
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
		const registeredCourses = getRegisteredCourses();
		const { courseIds } = regInfo;

		const coursesToRemove =
			courseIds.length - (4 - registeredCourses.length);

		const wouldBeCourses = registeredCourses.length + courseIds.length;

		// Validate before registering a course
		if (wouldBeCourses > 4) {
			if (registeredCourses.length !== 4) {
				return toast.error(
					`Remove ${coursesToRemove} ${
						coursesToRemove <= 1 ? "Course" : "Courses"
					} to Continue!`,
					{
						id: "warn1",
					}
				);
			}
			return toast.error(
				`Already Registered for ${registeredCourses.length} Courses!`,
				{ id: "warn2" }
			);
		}

		for (const id of courseIds) {
			saveRegisteredCourses(id);
		}

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
		setSelectedCourses([]);
	};

	return (
		<>
			{/* Course Registration Form */}
			<Form
				className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
				form={form}
				name="courseRegistration"
				layout="vertical"
				initialValues={{ studentName, studentEmail, studentId }}
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
						// defaultValue={name}
						allowClear
						id="studentName"
						placeholder="Enter your full name"
					/>
				</Form.Item>

				<Form.Item
					name="studentEmail"
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
					<Input
						// defaultValue={studentEmail}
						allowClear
						id="studentEmail"
						placeholder="Enter your email"
					/>
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
					<Input
						// defaultValue={studentId}
						allowClear
						id="studentId"
						placeholder="Enter your student id"
					/>
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
