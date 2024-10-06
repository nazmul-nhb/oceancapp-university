import React, { useRef, useState } from "react";
import { Modal } from "antd";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import type { Faculty } from "../types/interfaces";

interface ProfileModalProps {
	faculty: Faculty;
	index: number;
	open: boolean;
	onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
	faculty,
	index,
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
			<div style={{ textAlign: "center", marginBottom: "16px" }}>
				<img
					src={imageUrl}
					alt={`${facultyName}`}
					style={{
						borderRadius: "50%",
						width: "120px",
						height: "120px",
						objectFit: "cover",
					}}
				/>
			</div>
			<h2>{designation}</h2>
			<h3>Subjects:</h3>
			<ul>
				{subjects.map((subject, idx) => (
					<li key={idx}>{subject}</li>
				))}
			</ul>
			<p>
				<strong>Office Hours:</strong> {officeHours}
			</p>
			<p>
				<strong>Contact Email:</strong> {contactEmail}
			</p>
		</Modal>
	);
};

export default ProfileModal;
