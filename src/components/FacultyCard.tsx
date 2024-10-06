import React, { useState } from "react";
import { Card, Avatar, Button } from "antd";
import {
	ClockCircleOutlined,
	TrophyOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { Faculty } from "../types/interfaces";
import { getColorForFirstCharacter } from "color-generator-fl";
import ProfileModal from "./ProfileModal";

const { Meta } = Card;

interface FacultyProps {
	index: number;
	faculty: Faculty;
}

const FacultyCard: React.FC<FacultyProps> = ({ index, faculty }) => {
	const { facultyName, designation, officeHours } = faculty;
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Generate a background color based on the faculty's name
	const avatarColor = getColorForFirstCharacter(
		facultyName.split(" ")[1].split("")[1],
		97
	) as string;

	const bgColor = getColorForFirstCharacter(
		facultyName.split(" ")[1].split("")[1],
		25
	) as string;

	// Function to handle opening the modal
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	return (
		<Card
			style={{ backgroundColor: bgColor, maxWidth: 320 }}
			actions={[
				<Button type="primary" key={index} onClick={handleOpenModal}>
					<UserOutlined /> Details
				</Button>,
			]}
		>
			<Meta
				avatar={
					<Avatar
						className="hover:scale-110 transition-all duration-700"
						style={{
							backgroundColor: avatarColor,
							verticalAlign: "middle",
							borderColor: "white",
							fontWeight: "bold",
							fontSize: 20,
						}}
						size="large"
					>
						{facultyName.split(" ")[1].charAt(0)}
					</Avatar>
				}
				title={<span className="text-white">{facultyName}</span>}
				description={
					<div className="text-white space-y-1">
						<p className="text-sm font-kreonSerif font-light">
							<TrophyOutlined style={{ marginRight: 4 }} />
							{designation}
						</p>
						<p className="text-xs">
							<ClockCircleOutlined style={{ marginRight: 6 }} />
							{officeHours}
						</p>
					</div>
				}
			/>
			{/* Profile Modal */}
			<ProfileModal
				faculty={faculty}
				index={index}
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</Card>
	);
};

export default FacultyCard;
