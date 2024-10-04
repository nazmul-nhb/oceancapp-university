import React, { useState } from "react";
import type { Event } from "../types/interfaces";
import { formatDate, formatCalendarDate } from "../utilities/utilities";
import toast from "react-hot-toast";
import type { Dayjs } from "dayjs";
import { Calendar, Button, Popover, Tooltip } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const Events: React.FC<{ events: Event[] }> = ({ events }) => {
	const [eventsInCalendar, setEventsInCalendar] = useState<Event[]>([]);

	const addEventToCalendar = (event: Event) => {
		if (!eventsInCalendar.find((e) => e.eventId === event.eventId)) {
			setEventsInCalendar((prev) => [...prev, event]);
			toast.success(`${event.title} is Added to Calendar.`, {
				id: "event1",
			});
		} else {
			toast.error(`${event.title} is Already in the Calendar.`, {
				id: "event2",
			});
		}
	};

	// Function to render the calendar cell
	const cellRender = (value: Dayjs) => {
		const dateStr = value.format("YYYY-MM-DD");
		const eventsForDate = eventsInCalendar.filter(
			(event) => formatCalendarDate(event.date) === dateStr
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
		<section className="flex justify-between items-start flex-col lg:flex-row gap-5">
			<ul className="list-item space-y-3 ml-6">
				{events.map((event) => (
					<li key={event.eventId} className="list-disc space-x-4">
						<span>
							<strong>{event.title}</strong> -{" "}
							{formatDate(event.date)} ({event.description})
						</span>
						<Tooltip title="Add to Calendar">
							<Button
								shape="circle"
								icon={<CalendarOutlined />}
								type="primary"
								onClick={() => addEventToCalendar(event)}
							/>
						</Tooltip>
					</li>
				))}
			</ul>
			<div className="w-80 !rounded-lg">
				<Calendar
					className="bg-oceancapp-primary"
					fullscreen={false}
					cellRender={cellRender}
				/>
			</div>
		</section>
	);
};

export default Events;
