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

const Performance: React.FC<CoursesProps> = ({ courses }) => {
	// Count total courses finished
	const totalCourses = courses.length;

	// Group courses by grade & Count the occurrences of each grade
	const courseCountByGrade = courses.reduce((acc, course) => {
		if (course.grade) {
			acc[course.grade] = (acc[course.grade] || 0) + 1;
		}
		return acc;
	}, {} as Record<string, number>);

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

	// Custom plugin to display text in the center of the doughnut chart
	const centerTextPlugin = {
		id: "centerText",
		beforeDraw(chart: ChartJS<"doughnut">) {
			const { width, height, ctx } = chart;
			if (!ctx) return;

			ctx.restore();
			const fontSize = 17;
			ctx.font = `${fontSize}px bold`;
			ctx.textBaseline = "middle";

			// Calculate the center position of the chart
			const text = `${totalCourses} Courses`;
			const textX = Math.round((width - ctx.measureText(text).width) / 2);
			const textY = height / 2;

			ctx.fillStyle = "#fff"; // Set text color
			ctx.fillText(text, textX, textY);
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
