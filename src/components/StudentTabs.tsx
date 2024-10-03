import React from "react";
import { Tabs, ConfigProvider } from "antd";
import {
	BookOutlined,
	CheckCircleOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import { CourseTaken, Event } from "../types/interfaces";

interface TabProps {
	courses: CourseTaken[];
	finishedCourses: CourseTaken[];
	upcomingEvents: Event[];
}

const StudentTabs: React.FC<TabProps> = ({
	courses,
	finishedCourses,
	upcomingEvents,
}) => {
	// Define the tab items
	const tabItems = [
		{
			key: "1",
			label: (
				<span>
					<BookOutlined /> Current Courses
				</span>
			),
			children: (
				<ul>
					{courses.map((course) => (
						<li key={course.courseId}>
							<strong>{course.courseName}</strong> -{" "}
							{course.professorName} ({course.credits} credits)
						</li>
					))}
				</ul>
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
				<ul>
					{finishedCourses.map((course) => (
						<li key={course.courseId}>
							<strong>{course.courseName}</strong> -{" "}
							{course.professorName} (Grade: {course.grade})
						</li>
					))}
				</ul>
			),
		},
		{
			key: "3",
			label: (
				<span>
					<CalendarOutlined /> Upcoming Events
				</span>
			),
			children: (
				<ul>
					{upcomingEvents.map((event) => (
						<li key={event.eventId}>
							<strong>{event.title}</strong> -{" "}
							{event.date.toDateString()} ({event.description})
						</li>
					))}
				</ul>
			),
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
