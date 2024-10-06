import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";

const ProfileModal: React.FC = () => {
	const [open, setOpen] = useState(false);
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
		<>
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
						onFocus={() => {}}
						onBlur={() => {}}
					>
						Update Product
					</div>
				}
				open={open}
				footer={[
					<Button key="cancel" onClick={() => setOpen(false)}>
						Cancel
					</Button>,
				]}
				onCancel={() => setOpen(false)}
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
			</Modal>
		</>
	);
};

export default ProfileModal;
