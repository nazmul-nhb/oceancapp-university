import React, { useMemo, useState } from "react";
import { Form, Input, Select } from "antd";
import { facultyList } from "../data/faculty";
import type { Faculty } from "../types/interfaces";
import { Helmet } from "react-helmet-async";
import { BookOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import FacultyCard from "../components/FacultyCard";

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
	const filteredFaculty = useMemo(() => {
		return facultyList.filter((faculty: Faculty) => {
			const matchesName = faculty.facultyName
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
	}, [searchTerm, selectedDesignation, selectedSubject]);

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			<Helmet>
				<title>Faculty Overview - OceanCapp University</title>
			</Helmet>
			{/* Search/Filter Banner */}
			<div className="bg-bannerBG bg-cover bg-no-repeat shadow-oceancapp-primary shadow-lg rounded-lg p-8 mb-12 space-y-10">
				<h3 className="text-xl sm:text-2xl font-semibold font-kreonSerif text-white text-center">
					Find Your Professor
				</h3>
				{/* Filters */}
				<Form
					size="large"
					className="mb-6 flex flex-col md:flex-row md:gap-6 justify-center items-center"
				>
					{/* Search by name */}
					<Form.Item name="facultyName" className="w-full">
						<Input
							id="facultyName"
							suffix={<SearchOutlined />}
							placeholder="Search Faculty by Name"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full max-w-md"
							allowClear
						/>
					</Form.Item>

					{/* Filter by designation */}
					<Form.Item name="designation" className="w-full">
						<Select
							id="designation"
							suffixIcon={<UserOutlined />}
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
					<Form.Item name="subject" className="w-full">
						<Select
							id="subject"
							suffixIcon={<BookOutlined />}
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
			</div>
			{/* Faculty List */}
			<div className="flex justify-center w-full">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 mx-auto">
					{filteredFaculty.map((faculty, index) => (
						<FacultyCard
							key={faculty.facultyId}
							faculty={faculty}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default FacultyOverview;
