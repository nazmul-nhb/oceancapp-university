import React from "react";
import { Card, Popover } from "antd";
import ProfDetails from "./ProfDetails";
import { getColorForFirstCharacter } from "color-generator-fl";
import type { Course } from "../types/interfaces";
import {
	BookOutlined,
	StarOutlined,
	UserAddOutlined,
	AppstoreOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";

interface CoursesProps {
	courses: Course[];
	isCurrent?: boolean;
	isFinished?: boolean;
	isRegister?: boolean;
}

const Courses: React.FC<CoursesProps> = ({
	courses,
	isCurrent,
	isFinished,
	isRegister,
}) => {
	return (
		<div className="flex justify-center w-full">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto">
				{courses.map((course) => {
					const color = getColorForFirstCharacter(
						course.professorName.split(" ")[1].split("")[1]
					) as string;

					return (
						<Card
							hoverable
							bordered={false}
							className={
								isRegister
									? "bg-oceancapp-secondary"
									: "bg-oceancapp-primary"
							}
							key={course.courseId}
							style={{ margin: "8px 0", maxWidth: 320 }}
							title={
								<Popover
									content={
										isRegister ? (
											<ul>
												<li>
													<strong>
														{course.courseName}
													</strong>
													&nbsp;-&nbsp;
													{course.courseId}
												</li>
												<li>
													<strong>Capacity:</strong>
													&nbsp;{course?.capacity}
												</li>
												<li>
													<strong>Enrolled:</strong>
													&nbsp;{course?.enrolled}
												</li>
											</ul>
										) : (
											`${course.courseName} - ${course.courseId}`
										)
									}
								>
									<span
										style={{
											color: "white",
											fontSize: "18px",
										}}
									>
										{course.courseName}
									</span>
								</Popover>
							}
						>
							<div
								className="space-y-2"
								style={{ color: "white" }}
							>
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
								<p>
									<BookOutlined style={{ marginRight: 8 }} />
									{course.credits} Credits
								</p>

								{isCurrent && (
									<p>
										<ClockCircleOutlined
											style={{ marginRight: 8 }}
										/>
										{course.duration}
									</p>
								)}

								{isFinished && (
									<>
										<p>
											<ClockCircleOutlined
												style={{ marginRight: 8 }}
											/>
											{course?.semester}
										</p>
										<p>
											<StarOutlined
												style={{ marginRight: 8 }}
											/>
											Grade: {course?.grade}
										</p>
									</>
								)}

								{isRegister && (
									<p>
										<AppstoreOutlined
											style={{ marginRight: 8 }}
										/>
										{course?.department} Department
									</p>
								)}
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default Courses;
