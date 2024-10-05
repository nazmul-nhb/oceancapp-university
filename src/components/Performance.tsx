import React from "react";
import { Doughnut } from "react-chartjs-2"; // Import the Doughnut chart component
import type { CourseFinished } from "../types/interfaces";
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js"; // Import necessary Chart.js components
import { getColorForFirstCharacter } from "color-generator-fl";

// Register necessary components with Chart.js
Chart.register(ArcElement, Tooltip, Legend);

// Generate alphabets array
const alphabets = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(65 + i)
);

interface CoursesProps {
	courses: CourseFinished[];
}

const Performance: React.FC<CoursesProps> = ({ courses }) => {
	// Group courses by grade & Count the occurrences of each grade
	const courseCountByGrade = courses.reduce((acc, course) => {
		if (course.grade) {
			acc[course.grade] = (acc[course.grade] || 0) + 1;
		}
		return acc;
	}, {} as Record<string, number>);

	// Prepare data for the Doughnut chart
	const chartData = {
		labels: Object.keys(courseCountByGrade),
		datasets: [
			{
				data: Object.values(courseCountByGrade),
				backgroundColor: getColorForFirstCharacter(alphabets),
				hoverOffset: 4,
			},
		],
	};

	// Options for the chart
	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<"doughnut">) => {
						// Specify the tooltip context type
						const label = context.label || "";
						const value = context.raw;

						// Ensure that value is a number
						const count = typeof value === "number" ? value : 0;

						return `${label} in ${count} Courses`;
					},
				},
			},
		},
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<h3 className="text-white font-kreonSerif text-lg font-semibold">
				Your Performance
			</h3>
			<div style={{ width: "220px", height: "220px" }}>
				<Doughnut data={chartData} options={options} />{" "}
			</div>
		</div>
	);
};

export default Performance;
