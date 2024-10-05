import React from "react";
import { Doughnut } from "react-chartjs-2";
import type { CourseFinished } from "../types/interfaces";
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { getColorForFirstCharacter } from "color-generator-fl";
import type { ChartOptions, ChartData, Chart as ChartJS } from "chart.js";

// Register necessary components with Chart.js
Chart.register(ArcElement, Tooltip, Legend);

// Generate alphabets array
const alphabets = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(65 + i)
);

interface CoursesProps {
	courses: CourseFinished[];
}

// Grade points mapping based on your grading system
const gradePoints: Record<string, number> = {
	"A+": 4.0,
	A: 3.75,
	"A-": 3.5,
	"B+": 3.25,
	B: 3.0,
	C: 2.0,
	D: 1.0,
	F: 0.0,
};

const Performance: React.FC<CoursesProps> = ({ courses }) => {
	// Count total courses finished
	const totalCourses = courses.length;

	// Group courses by grade & count the occurrences of each grade
	const courseCountByGrade = courses.reduce((acc, course) => {
		if (course.grade) {
			acc[course.grade] = (acc[course.grade] || 0) + 1;
		}
		return acc;
	}, {} as Record<string, number>);

	// Calculate CGPA based on the grades
	const totalGradePoints = courses.reduce((acc, course) => {
		if (course.grade && gradePoints[course.grade] !== undefined) {
			return acc + gradePoints[course.grade];
		}
		return acc;
	}, 0);

	const cgpa =
		totalCourses > 0
			? (totalGradePoints / totalCourses).toFixed(2)
			: "0.00";

	// Prepare data for the Doughnut chart
	const chartData: ChartData<"doughnut"> = {
		labels: Object.keys(courseCountByGrade),
		datasets: [
			{
				data: Object.values(courseCountByGrade),
				backgroundColor: getColorForFirstCharacter(alphabets),
				hoverOffset: 4,
			},
		],
	};

	// Display total courses and CGPA in the center of the doughnut chart
	const centerTextPlugin = {
		id: "centerText",
		beforeDraw(chart: ChartJS<"doughnut">) {
			const { width, height, ctx } = chart;
			if (!ctx) return;

			ctx.restore();
			const fontSize = 14;
			ctx.font = `${fontSize}px bold`;
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillStyle = "#fff"; // Set text color

			// Calculate center position
			const centerX = width / 2;
			const centerY = height / 2;

			// First line: Total Courses
			const totalCoursesText = `${totalCourses} Courses`;
			ctx.fillText(totalCoursesText, centerX, centerY - 0); // Above the center

			// Second line: CGPA
			const cgpaText = `CGPA: ${cgpa}`;
			ctx.fillText(cgpaText, centerX, centerY + 24); // Below the center

			ctx.save();
		},
	};

	// Options for the chart including the center text plugin
	const options: ChartOptions<"doughnut"> = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<"doughnut">) => {
						const label = context.label || "";
						const value = context.raw;
						const count = typeof value === "number" ? value : 0;
						return `${label} in ${count} Courses`;
					},
				},
			},
			legend: {
				display: true,
			},
		},
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<h3 className="text-white font-kreonSerif text-lg font-semibold">
				Your Performance
			</h3>
			<div style={{ width: "220px", height: "220px" }}>
				<Doughnut
					data={chartData}
					options={options}
					plugins={[centerTextPlugin]}
				/>
			</div>
		</div>
	);
};

export default Performance;
