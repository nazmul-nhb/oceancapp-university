import React, { useRef, useState } from "react";
import { Modal } from "antd";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import EnrollForm from "./EnrollForm";
import type { Course } from "../types/interfaces";

interface EnrollModalProps {
	open: boolean;
	onClose: () => void;
	sortedCourses: Course[];
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const EnrollModal: React.FC<EnrollModalProps> = ({
	open,
	onClose,
	sortedCourses,
	setCourses,
}) => {
	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
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
					Enroll in Your Desired Course(s)
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
			<EnrollForm setCourses={setCourses} sortedCourses={sortedCourses} />
		</Modal>
	);
};

export default EnrollModal;
