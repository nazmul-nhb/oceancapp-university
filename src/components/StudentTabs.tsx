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
	return (
		// TODO: Redesign the courses and events data
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#002140", // Active tab color
					colorPrimaryHover: "#003c75", // Hover color
					colorTextBase: "#000", // Tab text color
				},
			}}
		>
			<Tabs size="large" animated={true} defaultActiveKey="1">
				<Tabs.TabPane
					tab={
						<span className="">
							<BookOutlined /> Current Courses
						</span>
					}
					key="1"
				>
					<ul>
						{courses.map((course) => (
							<li key={course.courseId}>
								<strong>{course.courseName}</strong> -{" "}
								{course.professorName} ({course.credits}{" "}
								credits)
							</li>
						))}
					</ul>
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={
						<span>
							<CheckCircleOutlined /> Finished Courses
						</span>
					}
					key="2"
				>
					<ul>
						{finishedCourses.map((course) => (
							<li key={course.courseId}>
								<strong>{course.courseName}</strong> -{" "}
								{course.professorName} (Grade: {course.grade})
							</li>
						))}
					</ul>
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={
						<span>
							<CalendarOutlined /> Upcoming Events
						</span>
					}
					key="3"
				>
					<ul>
						{upcomingEvents.map((event) => (
							<li key={event.eventId}>
								<strong>{event.title}</strong> -{" "}
								{event.date.toDateString()} ({event.description}
								)
							</li>
						))}
					</ul>
				</Tabs.TabPane>
			</Tabs>
		</ConfigProvider>
	);
};

export default StudentTabs;
