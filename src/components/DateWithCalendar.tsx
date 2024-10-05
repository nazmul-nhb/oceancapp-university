import React, { useState } from "react";
import { Calendar, Popover } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import type { Event } from "../types/interfaces";

interface EventProps {
	events: Event[];
}

const DateWithCalendar: React.FC<EventProps> = ({ events }) => {
	const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

	// Format the current date
	const formattedDate = currentDate.format("dddd, MMMM D, YYYY");

	// Custom cell render function for the calendar
	const cellRender = (date: Dayjs) => {
		const eventOnDate = events.filter((event) =>
			dayjs(event.date).isSame(date, "day")
		);

		return (
			<div className="relative">
				{eventOnDate.length > 0 && (
					<Popover
						content={
							<>
								{eventOnDate.map((event) => (
									<p key={event.eventId}>
										{event.description}
									</p>
								))}
							</>
						}
						title={`${eventOnDate
							.map((event) => event.title)
							.join(", ")} on ${date.format("MMMM D, YYYY")}`}
						trigger="hover"
					>
						<span className="p-2 cursor-pointer text-oceancapp-secondary absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
							●
						</span>
					</Popover>
				)}
			</div>
		);
	};

	// Event handler for changing the calendar panel
	const onPanelChange = (value: Dayjs) => {
		setCurrentDate(value);
	};

	return (
		<div className="absolute top-1 lg:right-20 md:right-4 md:left-auto left-1/2 transform -translate-x-1/2 lg:translate-x-0 text-nowrap">
			<Popover
				trigger="click"
				content={
					<Calendar
						className="bg-oceancapp-primary"
						fullscreen={false}
						cellRender={cellRender}
						value={currentDate}
						onPanelChange={onPanelChange}
						style={{ width: "280px" }}
					/>
				}
			>
				<div className="text-white text-xs animate-ping text-center">
					Check the Upcoming Events
				</div>
				<div className="cursor-pointer text-lg text-white font-semibold animate-pulse">
					{formattedDate}
				</div>
			</Popover>
		</div>
	);
};

export default DateWithCalendar;
