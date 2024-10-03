import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const { Content, Footer } = Layout;

const Root: React.FC = () => {
	return (
		<Layout className="min-h-screen">
			<Layout className="relative h-[calc(100vh-64px)]">
				<Content className="overflow-y-auto oceancapp-scrollbar">
					<Navbar />
					<div className="md:ml-20 bg-oceancapp-secondary/50">
						<Outlet />
						<Footer style={{ textAlign: "center" }}>
							OceanCapp University &copy;{" "}
							{new Date().getFullYear()}
						</Footer>
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Root;
