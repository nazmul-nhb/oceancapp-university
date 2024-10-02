import { Breadcrumb, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { PiBooks } from "react-icons/pi";
import { logo } from "../constants";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const { Header, Content, Footer, Sider } = Layout;

const items: MenuItem[] = [
	getItem("Student Portal", "1", <UserOutlined />),
	getItem("Faculty Overview", "2", <TeamOutlined />),
	getItem("Enroll in Courses", "9", <PiBooks />),
	getItem("User", "sub1", <UserOutlined />, [
		getItem("Tom", "3"),
		getItem("Bill", "4"),
		getItem("Alex", "5"),
	]),
	getItem("Team", "sub2", <TeamOutlined />, [
		getItem("Team 1", "6"),
		getItem("Team 2", "8"),
	]),
];

const Root = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout>
				<Sider
					className="min-h-screen overflow-y-auto"
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div className="demo-logo-vertical" />
					<Menu
						theme="dark"
						defaultSelectedKeys={["1"]}
						mode="inline"
						items={items}
					/>
				</Sider>
				<Content style={{ height: "100vh", overflow: "auto" }}>
					<Header
						className="flex justify-between"
						style={{ display: "flex", alignItems: "center" }}
					>
						<figure className="flex items-center">
							<img
								className="h-full w-12"
								src={logo}
								alt="Logo"
							/>
							<figcaption className="text-white">
								OceanCapp University
							</figcaption>
						</figure>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={["2"]}
							items={items}
							style={{ flex: 1, minWidth: 0 }}
						/>
					</Header>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<Outlet />
					<Footer style={{ textAlign: "center" }}>
						OceanCapp University &copy; {new Date().getFullYear()}
					</Footer>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Root;
