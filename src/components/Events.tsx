import React, { useState } from "react";
import type { Event } from "../types/interfaces";
import { formatDate, formatCalendarDate } from "../utilities/utilities";
import toast from "react-hot-toast";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Calendar, Button, Popover, Tooltip } from "antd";
import {
	ScheduleOutlined,
	CaretLeftOutlined,
	CaretRightOutlined,
} from "@ant-design/icons";

const Events: React.FC<{ events: Event[] }> = ({ events }) => {
	const [eventsInCalendar, setEventsInCalendar] = useState<Event[]>([]);
	const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

	// Function to move to the previous month
	const goToPreviousMonth = () => {
		setCurrentDate(currentDate.subtract(1, "month"));
	};

	// Function to move to the next month
	const goToNextMonth = () => {
		setCurrentDate(currentDate.add(1, "month"));
	};

	// When user manually changes the month in the calendar
	const onPanelChange = (date: Dayjs) => {
		setCurrentDate(date);
	};

	// Add events to the calendar
	const addEventToCalendar = (event: Event) => {
		if (!eventsInCalendar.find((e) => e.eventId === event.eventId)) {
			setEventsInCalendar((prev) => [...prev, event]);
			toast.success(`${event.title} is Added to Calendar!`, {
				id: "event1",
			});
		} else {
			toast.error(`${event.title} is Already in the Calendar!`, {
				id: "event2",
			});
		}
	};

	// Function to render the calendar cell
	const cellRender = (value: Dayjs) => {
		const dateString = value.format("YYYY-MM-DD");
		const eventsForDate = eventsInCalendar.filter(
			(event) => formatCalendarDate(event.date) === dateString
		);

		return (
			<div className="relative">
				{eventsForDate.length > 0 && (
					<div className="p-0">
						{eventsForDate.map((event) => (
							<Popover
								key={event.eventId}
								title={event.title}
								content={event.description}
								trigger="hover"
							>
								<span className="p-2 cursor-pointer text-oceancapp-secondary absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
									●
								</span>
							</Popover>
						))}
					</div>
				)}
			</div>
		);
	};

	return (
		<section className="flex justify-between text-base items-start flex-col lg:flex-row gap-5">
			<ul className="space-y-3">
				{events.map((event) => (
					<li key={event.eventId} className="space-x-2">
						<Tooltip title="Add to Calendar">
							<Button 
							className="animate-pulse"
								size="small"
								shape="circle"
								icon={<ScheduleOutlined />}
								type="primary"
								onClick={() => addEventToCalendar(event)}
							/>
						</Tooltip>
						<span>
							<strong>{event.title}</strong> -{" "}
							{formatDate(event.date)} ({event.description})
						</span>
					</li>
				))}
			</ul>
			<div className="w-72 !rounded-lg">
				<div className="calendar-controls flex justify-between mb-4">
					<Button
						icon={<CaretLeftOutlined />}
						onClick={goToPreviousMonth}
					/>
					<h3 className="text-lg font-semibold font-kreonSerif">
						{currentDate.format("MMMM YYYY")}
					</h3>{" "}
					<Button
						icon={<CaretRightOutlined />}
						onClick={goToNextMonth}
					/>
				</div>
				<Calendar
					className="bg-oceancapp-primary"
					fullscreen={false}
					cellRender={cellRender}
					value={currentDate}
					onPanelChange={onPanelChange}
				/>
			</div>
		</section>
	);
};

export default Events;
