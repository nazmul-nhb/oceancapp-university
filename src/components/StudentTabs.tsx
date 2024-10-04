import React, { useEffect, useMemo, useState } from "react";
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
	const [activeKey, setActiveKey] = useState("current-courses");

	// Create tabItems array for showing tabs using useMemo
	const tabItems = useMemo(
		() => [
			{
				key: "current-courses",
				label: (
					<span>
						<BookOutlined /> Current Courses
					</span>
				),
				children: (
					<div className="course-list">
						{courses.map((course) => (
							<Card
								key={course.courseId}
								style={{ margin: "8px 0" }}
							>
								<strong>{course.courseName}</strong> -{" "}
								{course.professorName} ({course.credits}{" "}
								credits)
							</Card>
						))}
					</div>
				),
			},
			{
				key: "finished-courses",
				label: (
					<span>
						<CheckCircleOutlined /> Finished Courses
					</span>
				),
				children: (
					<div className="finished-course-list">
						{finishedCourses.map((course) => (
							<Card
								key={course.courseId}
								style={{ margin: "8px 0" }}
							>
								<strong>{course.courseName}</strong> -{" "}
								{course.professorName} (Grade: {course.grade})
							</Card>
						))}
					</div>
				),
			},
			{
				key: "upcoming-events",
				label: (
					<span>
						<CalendarOutlined /> Upcoming Events
					</span>
				),
				children: (
					<>
						<h3 className="text-xl mb-4 font-semibold font-kreonSerif">
							Add Events to Your Calendar
						</h3>
						<Events events={upcomingEvents} />
					</>
				),
			},
		],
		[courses, finishedCourses, upcomingEvents]
	);

	// Handle tab change
	const handleTabChange = (key: string) => {
		setActiveKey(key);
		window.location.hash = `#${key}`;
	};

	// Effect to set the initial tab based on the hash
	useEffect(() => {
		const hashKey = window.location.hash.replace("#", "");

		// Check if there's a valid hash and set the activeKey accordingly
		if (hashKey) {
			const found = tabItems.some((item) => item.key === hashKey);
			setActiveKey(found ? hashKey : "current-courses");
		} else {
			setActiveKey("current-courses");
			window.location.hash = `#current-courses`;
		}
	}, [tabItems]);

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
				activeKey={activeKey}
				onChange={handleTabChange}
				items={tabItems}
			/>
		</ConfigProvider>
	);
};

export default StudentTabs;
