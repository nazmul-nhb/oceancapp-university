import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { facultyList } from "../data/faculty";
import { Faculty } from "../types/interfaces";
import { Helmet } from "react-helmet-async";
import { getColorForFirstCharacter } from "color-generator-fl";
import { UserOutlined } from "@ant-design/icons";

const FacultyOverview: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedDesignation, setSelectedDesignation] = useState<
		string | null
	>(null);
	const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

	// Generate unique designations and subjects
	const uniqueDesignations = Array.from(
		new Set(facultyList.map((faculty) => faculty.designation))
	);

	const uniqueSubjects = Array.from(
		new Set(facultyList.flatMap((faculty) => faculty.subjects))
	).sort();

	// Filter faculty members based on the search term and selected options
	const filteredFaculty = facultyList.filter((faculty: Faculty) => {
		const matchesName = faculty.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesDesignation = selectedDesignation
			? faculty.designation === selectedDesignation.trim()
			: true;
		const matchesSubject = selectedSubject
			? faculty.subjects.includes(selectedSubject.trim())
			: true;

		return matchesName && matchesDesignation && matchesSubject;
	});

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Faculty Overview - OceanCapp University</title>
			</Helmet>

			{/* Filters */}
			<Form className="mb-6 flex flex-col md:flex-row md:gap-6 justify-center items-center">
				{/* Search by name */}
				<Form.Item className="w-full">
					<Input
						prefix={<UserOutlined />}
						placeholder="Search Faculty by Name"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full max-w-md"
						allowClear
					/>
				</Form.Item>

				{/* Filter by designation */}
				<Form.Item className="w-full">
					<Select
						placeholder="Filter Faculty by Designation"
						value={selectedDesignation} // Initial value is null
						onChange={(value) => setSelectedDesignation(value)}
						className="w-full max-w-md"
						allowClear
						showSearch
						options={uniqueDesignations.map((designation) => ({
							label: designation,
							value: designation,
						}))}
						filterOption={(input, option) => {
							// Ensure a boolean return type
							if (!option) return false; // If option is undefined, return false
							return option.label
								.toLowerCase()
								.includes(input.toLowerCase());
						}}
					/>
				</Form.Item>

				{/* Filter by subject */}
				<Form.Item className="w-full">
					<Select
						placeholder="Filter Faculty by Subject"
						value={selectedSubject} // Initial value is null
						onChange={(value) => setSelectedSubject(value)}
						className="w-full max-w-md"
						allowClear
						showSearch
						filterOption={(input, option) => {
							// Ensure a boolean return type
							if (!option) return false; // If option is undefined, return false
							return option.label
								.toLowerCase()
								.includes(input.toLowerCase());
						}}
						options={uniqueSubjects.map((subject) => ({
							label: subject,
							value: subject,
						}))}
					/>
				</Form.Item>
			</Form>

			{/* Faculty List */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredFaculty.map((faculty) => {
					const {
						facultyId,
						name,
						designation,
						subjects,
						officeHours,
						contactEmail,
					} = faculty;
					const firstName = name.split(" ")[1];
					const color = getColorForFirstCharacter(firstName, 97);

					return (
						<div
							key={facultyId}
							className="shadow-lg bg-white rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out relative"
						>
							{/* Basic faculty information */}
							<h3 className="text-xl font-semibold mb-2 text-blue-800">
								{name}
							</h3>
							<p className="text-gray-600 font-medium">
								{designation}
							</p>
							<p className="mt-3 text-gray-700">
								<strong>Subjects:</strong>{" "}
								{subjects.slice(0, 3).join(", ")}{" "}
								{subjects.length > 3 && (
									<span className="text-blue-600 cursor-pointer">
										+{subjects.length - 3} more
									</span>
								)}
							</p>

							{/* Hidden details revealed on hover */}
							<div
								style={{ backgroundColor: color as string }}
								className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-4 opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out z-[1] text-white font-bold rounded-lg"
							>
								<h4 className="text-lg font-semibold mb-2">
									Office Hours
								</h4>
								<p className="mb-2">{officeHours}</p>
								<p className="">
									Contact:{" "}
									<a
										href={`mailto:${contactEmail}`}
										className="underline"
									>
										{contactEmail}
									</a>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default FacultyOverview;
