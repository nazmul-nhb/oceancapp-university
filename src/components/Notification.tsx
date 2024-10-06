import React, { useEffect, useState, useRef } from "react";
import { Badge, FloatButton, Dropdown, notification, Button } from "antd";
import {
	BellOutlined,
	CommentOutlined,
	DeleteTwoTone,
} from "@ant-design/icons";
import { Event } from "../types/interfaces";
import { studentData } from "../data/students";
import { formatDate } from "../utilities/utilities";
import toast from "react-hot-toast";

const Notification: React.FC = () => {
	const { upcomingEvents } = studentData;
	const [notifications, setNotifications] = useState<Event[]>([]);
	const [api, contextHolder] = notification.useNotification();

	const [newNotificationIds, setNewNotificationIds] = useState<Set<string>>(
		new Set()
	);
	
	// Get maximum 3 notifications to avoid stack overflow
	const events = upcomingEvents.slice(0, 2);

	// Store notification index in a ref to prevent appearing multiple notifications
	const notificationIndexRef = useRef(0);
	const initialLoadRef = useRef(true); // Reference to track initial load

	useEffect(() => {
		const showNotification = (event: Event) => {
			api.open({
				message: event.title,
				description: formatDate(event.date),
				placement: "topRight",
				duration: 3,
			});
		};

		// Show the first notification only on initial render
		if (initialLoadRef.current && events.length > 0) {
			const currentEvent = events[notificationIndexRef.current];
			showNotification(currentEvent);
			setNotifications((prev) => [...prev, currentEvent]);
			setNewNotificationIds((prev) =>
				new Set(prev).add(currentEvent.eventId)
			);
			notificationIndexRef.current++;
			initialLoadRef.current = false; // Set to false after the first load
		}

		// Show subsequent notifications every 5 mins
		const intervalId = setInterval(() => {
			if (notificationIndexRef.current < events.length) {
				const currentEvent = events[notificationIndexRef.current];
				showNotification(currentEvent);
				setNotifications((prev) => [...prev, currentEvent]);
				setNewNotificationIds((prev) =>
					new Set(prev).add(currentEvent.eventId)
				);
				notificationIndexRef.current++;
			}
		}, 300000); // 300000 for 5 mins
		// Cleanup on component unmount
		return () => clearInterval(intervalId);
	}, [api, events]);

	// Function to handle notification click (mark as read)
	const handleNotificationClick = (eventId: string) => {
		setNewNotificationIds((prev) => {
			const newIds = new Set(prev);
			// Remove the event from new notifications
			newIds.delete(eventId);
			return newIds;
		});
	};

	// Clear all notifications
	const clearNotifications = () => {
		setNotifications([]);
		setNewNotificationIds(new Set());
		notificationIndexRef.current = 0;
	};

	// Dropdown menu for notifications
	const notificationMenu = {
		items: [
			...notifications.map((event, index) => ({
				key: `${event.eventId}-${index}`,
				label: (
					<div
						onClick={() => handleNotificationClick(event.eventId)}
						style={{ padding: "8px" }}
					>
						<div className="flex flex-col">
							<span className="font-bold">{event.title}</span>
							<span>{formatDate(event.date)}</span>
							<span>{event.description}</span>
						</div>
					</div>
				),
			})),
			// Clear button at the end of the dropdown
			{
				key: "clear",
				label: (
					<Button
						icon={<DeleteTwoTone style={{ marginRight: "4px" }} />}
						type="link"
						onClick={clearNotifications}
						style={{
							display: "block",
							textAlign: "center",
							padding: "8px",
						}}
					>
						Clear Notifications
					</Button>
				),
			},
		],
	};

	// Function to handle message icon click
	const handleMsgIconClick = (e: React.MouseEvent) => {
		e.preventDefault();
		toast("Message is Coming Soon!", {
			position: "top-right",
			style: {
				background: "#007bff",
				color: "#fff",
				padding: "10px",
				borderRadius: "6px",
			},
		});
	};

	return (
		<>
			{contextHolder}
			<FloatButton.Group
				trigger="click"
				type="primary"
				style={{ insetInlineEnd: 20, insetBlockEnd: 80 }}
				icon={
					<Badge
						offset={[0, 10]}
						style={{
							padding: 0,
							marginTop: "-6px",
						}}
						size="small"
						count={newNotificationIds.size}
						dot
					>
						<BellOutlined style={{ fontSize: "18px" }} />
					</Badge>
				}
			>
				{/* Dropdown shows the notifications on bell icon click */}
				<Dropdown
					menu={notificationMenu}
					trigger={["click"]}
					overlayStyle={{
						maxHeight: 400,
						overflowY: "auto",
					}}
				>
					<Badge size="small" count={newNotificationIds.size}>
						<FloatButton icon={<BellOutlined />} />
					</Badge>
				</Dropdown>

				{/* Dummy Message Icon for showing toast */}
				<FloatButton
					icon={<CommentOutlined />}
					onClick={handleMsgIconClick}
				/>
			</FloatButton.Group>
		</>
	);
};

export default Notification;
