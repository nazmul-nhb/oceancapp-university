import React from "react";
import type { CourseReg } from "../types/interfaces";
import { Card, Popover } from "antd";
import {
	BookOutlined,
	UserAddOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";
import ProfDetails from "./ProfDetails";
import { getColorForFirstCharacter } from "color-generator-fl";

interface CoursesProps {
	courses: CourseReg[];
}

const CurrentCourses: React.FC<CoursesProps> = ({ courses }) => {
	return (
		<div className="grid grid-cols-4 gap-5">
			{courses.map((course) => {
				const color = getColorForFirstCharacter(
					course.professorName.split(" ")[1].split("")[1]
				) as string;

				return (
					<Card
						extra={
							<span className="text-gray-200">
								{course.courseId}
							</span>
						}
						hoverable
						bordered={false}
						className="bg-oceancapp-secondary"
						key={course.courseId}
						style={{ margin: "8px 0" }}
						title={
							<Popover
								content={`${course.courseName} - ${course.courseId}`}
							>
								<span
									style={{ color: "white", fontSize: "18px" }}
								>
									{course.courseName}
								</span>
							</Popover>
						}
					>
						<div className="space-y-2" style={{ color: "white" }}>
							<Popover
								color={color}
								content={
									<ProfDetails
										email={course.professorEmail}
									/>
								}
								trigger="hover"
							>
								<p className="cursor-pointer animate-pulse font-semibold font-kreonSerif text-base">
									<UserAddOutlined
										style={{ marginRight: 8 }}
									/>
									{course.professorName}
								</p>
							</Popover>
							<p className="">
								<BookOutlined style={{ marginRight: 8 }} />
								{course.credits} Credits
							</p>
							<p className="">
								<ClockCircleOutlined style={{ marginRight: 8 }} />
								{course.duration}
							</p>
						</div>
					</Card>
				);
			})}
		</div>
	);
};

export default CurrentCourses;
