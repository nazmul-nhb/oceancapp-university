import React from "react";
import { Card, Avatar } from "antd";
import {
	ClockCircleOutlined,
	TrophyOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { Faculty } from "../types/interfaces";
import { getColorForFirstCharacter } from "color-generator-fl";

const { Meta } = Card;

interface FacultyProps {
	faculty: Faculty;
}

const FacultyCard: React.FC<FacultyProps> = ({ faculty }) => {
	const { facultyName, designation, officeHours } = faculty;

	// Generate a background color based on the faculty's name
	const avatarColor = getColorForFirstCharacter(
		facultyName.split(" ")[1].split("")[1],
		97
	) as string;

	const bgColor = getColorForFirstCharacter(
		facultyName.split(" ")[1].split("")[1],
		25
	) as string;

	return (
		<Card
			style={{ backgroundColor: bgColor, maxWidth: 320 }}
			actions={[<UserOutlined key="profile" />]}
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
		</Card>
	);
};

export default FacultyCard;
