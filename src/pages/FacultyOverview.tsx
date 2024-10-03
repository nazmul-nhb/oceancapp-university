import React, { useState } from "react";
import { facultyList } from "../data/faculty";
import { Faculty } from "../types/interfaces";
import { getColorForFirstCharacter } from "color-generator-fl";

const FacultyOverview: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	// Filter faculty members based on the search term (matching name, designation, or subjects)
	const filteredFaculty = facultyList.filter(
		(faculty: Faculty) =>
			faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faculty.designation
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			faculty.subjects.some((subject) =>
				subject.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	return (
		<section className="min-h-[calc(100vh-64px)] px-8 py-5">
			{/* Search bar */}
			<div className="mb-6 flex items-center justify-center">
				<input
					type="text"
					placeholder="Search faculty by name, designation, or subject"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none"
				/>
			</div>

			{/* Faculty list */}
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
