import React, { useRef, useState } from "react";
import { Modal, Card, Row } from "antd";
import { ClockCircleOutlined, MailOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import type { Faculty } from "../types/interfaces";
import SubjectsTags from "./SubjectsTags";

interface ProfileModalProps {
	faculty: Faculty;
	index: number;
	bgColor: string;
	open: boolean;
	onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
	faculty,
	index,
	bgColor,
	open,
	onClose,
}) => {
	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});

	const {
		gender,
		subjects,
		facultyName,
		contactEmail,
		designation,
		officeHours,
	} = faculty;

	const draggleRef = useRef<HTMLDivElement>(null);

	const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	// Image URL using the faculty's gender and a sample index
	const imageUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;

	return (
		<Modal
			title={
				<div
					style={{ width: "100%", cursor: "move" }}
					onMouseOver={() => {
						if (disabled) {
							setDisabled(false);
						}
					}}
					onMouseOut={() => {
						setDisabled(true);
					}}
				>
					{facultyName}&apos;s Profile
				</div>
			}
			open={open}
			footer={null}
			onCancel={onClose}
			modalRender={(modal) => (
				<Draggable
					disabled={disabled}
					bounds={bounds}
					nodeRef={draggleRef}
					onStart={(event, uiData) => onStart(event, uiData)}
				>
					<div ref={draggleRef}>{modal}</div>
				</Draggable>
			)}
		>
			{/* Contents */}
			<Card
				style={{
					backgroundColor: bgColor,
					borderRadius: "8px",
					marginBottom: "16px",
				}}
			>
				<div className="flex flex-col md:flex-row items-center gap-5">
					<img
						src={imageUrl}
						alt={facultyName}
						style={{
							borderRadius: "50%",
							width: "120px",
							height: "120px",
							objectFit: "cover",
							marginRight: "16px",
						}}
					/>
					<div className="flex-1 font-semibold">
						<h2 className="m-0 text-lg font-kreonSerif">
							{designation} {facultyName}
						</h2>
						<Row style={{ marginTop: "16px" }}>
							<span>
								<ClockCircleOutlined
									style={{ marginRight: 8 }}
								/>
								{officeHours}
							</span>
						</Row>
						<Row style={{ marginTop: "16px" }}>
							<span>
								<MailOutlined style={{ marginRight: 8 }} />
								<a href={`mailto:${contactEmail}`}>{contactEmail}</a>
							</span>
						</Row>
					</div>
				</div>
			</Card>
			<SubjectsTags subjects={subjects} />
		</Modal>
	);
};

export default ProfileModal;
