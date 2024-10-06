import React, { useEffect, useMemo, useState } from "react";
import Events from "./Events";
import { Tabs, ConfigProvider } from "antd";
import type { Course, Event } from "../types/interfaces";

import {
	BookOutlined,
	CheckCircleOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import Courses from "./Courses";
import { calculateTotalCredits } from "../utilities/utilities";

interface TabProps {
	currentCourses: Course[];
	finishedCourses: Course[];
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
							Courses You Enrolled this Semester:&nbsp;
							{calculateTotalCredits(currentCourses)} Credits
						</h3>
						<Courses isCurrent={true} courses={currentCourses} />
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
							Courses You Already Finished:&nbsp;
							{calculateTotalCredits(finishedCourses)} Credits
						</h3>
						<Courses isFinished={true} courses={finishedCourses} />
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
