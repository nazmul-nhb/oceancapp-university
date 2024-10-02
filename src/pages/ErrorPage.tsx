import React from "react";
import { Button, Empty, Typography } from "antd";
import { Link } from "react-router-dom";
import { empty } from "../constants";

const ErrorPage: React.FC = () => {
	return (
		<section className="flex justify-center items-center">
			<Empty
				image={empty}
				imageStyle={{
					height: "50vh",
					display: "flex",
					justifyContent: "center",
				}}
				description={
					<Typography.Text>
						<div className="w-full text-center">
							<h2 className="mb-8 !font-extrabold text-9xl !text-red-600">
								404
							</h2>
						</div>
						<p className="text-lg font-bold md:text-3xl">
							Page Not Found!
						</p>
					</Typography.Text>
				}
			>
				<Link to="/">
					<Button type="primary">Back to Home</Button>
				</Link>
			</Empty>
		</section>
	);
};

export default ErrorPage;
