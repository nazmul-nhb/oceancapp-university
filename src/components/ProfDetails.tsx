import React from "react";
import { Card, Button, ConfigProvider } from "antd";
import {
	FacebookFilled,
	WhatsAppOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { facultyList } from "../data/faculty";
import { getColorForFirstCharacter } from "color-generator-fl";

interface ProfDetailsProps {
	email: string;
}

const ProfDetails: React.FC<ProfDetailsProps> = ({ email }) => {
	// Find the faculty details based on the email
	const profDetails = facultyList.find(
		(faculty) => faculty.contactEmail === email
	);

	if (!profDetails) {
		return <div>Faculty Not Found!</div>;
	}

	const color = getColorForFirstCharacter(
		profDetails.facultyName.split(" ")[1].split("")[1],
		40
	) as string;

	return (
		<ConfigProvider
			theme={{
				components: {
					Card: {
						actionsBg: color,
					},
				},
			}}
		>
			<Card
				className="text-white rounded-lg shadow-none"
				bordered={false}
				style={{
					padding: 0,
					maxWidth: "340px",
					backgroundColor: color,
				}}
				title={
					<span style={{ color: "white", fontSize: "18px" }}>
						{profDetails.facultyName}
					</span>
				}
				actions={[
					<Button
						key={"whatsapp"}
						type="link"
						href={`https://api.whatsapp.com/send?phone=&text=Hello ${profDetails.facultyName}`}
						target="_blank"
						icon={<WhatsAppOutlined />}
					/>,
					<Button
						key={"facebook"}
						type="link"
						href={`https://www.facebook.com/nazmul.batchu`}
						target="_blank"
						icon={<FacebookFilled />}
					/>,
					<Button
						key={"email"}
						type="link"
						href={`mailto:${profDetails.contactEmail}`}
						icon={<MailOutlined />}
					/>,
				]}
			>
				<div className="text-white space-y-2">
					<p>
						<strong>Office Hours:</strong> {profDetails.officeHours}
					</p>
					<p>
						<strong>Email:</strong> {profDetails.contactEmail}
					</p>
					<p>
						<strong>Subjects:</strong>
						{profDetails.subjects
							.slice(0, 6)
							.map((subject, index) => (
								<span className="inline-block" key={index}>
									&nbsp;{index + 1}.{subject}
								</span>
							))}
					</p>
					{profDetails.subjects.length > 6 && (
						<p className="cursor-pointer text-gray-300 hover:scale-105 transition-transform duration-500">
							View All Subjects
						</p>
					)}
				</div>
			</Card>
		</ConfigProvider>
	);
};

export default ProfDetails;
