import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Content } = Layout;

const Root: React.FC = () => {
	return (
		<Layout className="min-h-screen">
			<Layout className="relative h-[calc(100vh-64px)] !bg-oceancapp-secondary/50">
				<Content className="overflow-y-auto oceancapp-scrollbar">
					<Navbar />
					<div className="md:ml-20">
						<Outlet />
					</div>
					<Footer />
				</Content>
			</Layout>
		</Layout>
	);
};

export default Root;
