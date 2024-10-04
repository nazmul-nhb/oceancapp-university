import React from "react";
import Events from "./Events";
import { Tabs, ConfigProvider, Card } from "antd";
import type { CourseFinished, CourseReg, Event } from "../types/interfaces";

import {
	BookOutlined,
	CheckCircleOutlined,
	CalendarOutlined,
} from "@ant-design/icons";

interface TabProps {
	courses: CourseFinished[] | CourseReg[];
	finishedCourses: CourseFinished[];
	upcomingEvents: Event[];
}

const StudentTabs: React.FC<TabProps> = ({
	courses,
	finishedCourses,
	upcomingEvents,
}) => {
	// Create tabItems array for showing tabs
	const tabItems = [
		{
			key: "1",
			label: (
				<span>
					<BookOutlined /> Current Courses
				</span>
			),
			children: (
				<div className="course-list">
					{courses.map((course) => (
						<Card key={course.courseId} style={{ margin: "8px 0" }}>
							<strong>{course.courseName}</strong> -{" "}
							{course.professorName} ({course.credits} credits)
						</Card>
					))}
				</div>
			),
		},
		{
			key: "2",
			label: (
				<span>
					<CheckCircleOutlined /> Finished Courses
				</span>
			),
			children: (
				<div className="finished-course-list">
					{finishedCourses.map((course) => (
						<Card key={course.courseId} style={{ margin: "8px 0" }}>
							<strong>{course.courseName}</strong> -{" "}
							{course.professorName} (Grade: {course.grade})
						</Card>
					))}
				</div>
			),
		},
		{
			key: "3",
			label: (
				<span>
					<CalendarOutlined /> Upcoming Events
				</span>
			),
			children: <Events events={upcomingEvents} />,
		},
	];

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#002140", // Active tab color
					colorPrimaryHover: "#003c75", // Hover color
					colorTextBase: "#000", // Tab text color
				},
			}}
		>
			<Tabs
				size="large"
				animated={true}
				defaultActiveKey="1"
				items={tabItems}
			/>
		</ConfigProvider>
	);
};

export default StudentTabs;
