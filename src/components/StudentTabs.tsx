import React, { useEffect, useMemo, useState } from "react";
import Events from "./Events";
import { Tabs, ConfigProvider } from "antd";
import type { CourseFinished, CourseReg, Event } from "../types/interfaces";

import {
	BookOutlined,
	CheckCircleOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import CurrentCourses from "./CurrentCourses";
import FinishedCourses from "./FinishedCourses";

interface TabProps {
	currentCourses: CourseReg[];
	finishedCourses: CourseFinished[];
	upcomingEvents: Event[];
}

const StudentTabs: React.FC<TabProps> = ({
	currentCourses,
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
					<>
						<h3 className="text-xl mb-4 font-semibold font-kreonSerif">
							Courses that you enrolled this semester
						</h3>{" "}
						<CurrentCourses courses={currentCourses} />
					</>
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
					<>
						<h3 className="text-xl mb-4 font-semibold font-kreonSerif">
							List of Courses that you have finished
						</h3>
						<FinishedCourses courses={finishedCourses} />
					</>
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
		[currentCourses, finishedCourses, upcomingEvents]
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
