import { Layout, Menu } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { PiBooks } from "react-icons/pi";
import { logo } from "../constants";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
	{
		key: "1",
		icon: <UserOutlined />,
		label: <NavLink to="/">Student Portal</NavLink>,
	},
	{
		key: "2",
		icon: <TeamOutlined />,
		label: <NavLink to="/faculty-overview">Faculty Overview</NavLink>,
	},
	{
		key: "3",
		icon: <PiBooks />,
		label: <NavLink to="/course-registration">Enroll in Courses</NavLink>,
	},
	{
		key: "sub1",
		icon: <UserOutlined />,
		label: "User",
		children: [
			{
				key: "4",
				label: <NavLink to="/user/tom">Tom</NavLink>,
			},
			{
				key: "5",
				label: <NavLink to="/user/bill">Bill</NavLink>,
			},
			{
				key: "6",
				label: <NavLink to="/user/alex">Alex</NavLink>,
			},
		],
	},
	{
		key: "sub2",
		icon: <TeamOutlined />,
		label: "Team",
		children: [
			{
				key: "7",
				label: <NavLink to="/team/1">Team 1</NavLink>,
			},
			{
				key: "8",
				label: <NavLink to="/team/2">Team 2</NavLink>,
			},
		],
	},
];

const Root: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();

	const getSelectedKey = () => {
		const currentPath = location.pathname;
		const selectedKeys = menuItems
			.map((item) => {
				if (item.children) {
					return item.children.find(
						(child) => child.label.props.to === currentPath
					)
						? item.key
						: null;
				} else {
					return item.label.props.to === currentPath
						? item.key
						: null;
				}
			})
			.filter((key): key is string => key !== null);

		return selectedKeys.length > 0 ? selectedKeys : ["1"];
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout>
				<Sider
					className="hidden lg:block min-h-screen overflow-y-auto"
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<figure className="my-2 ml-6">
						<img className="w-12" src={logo} alt="Logo" />
					</figure>
					<Menu
						mode="inline"
						theme="dark"
						selectedKeys={getSelectedKey()}
						items={menuItems}
					/>
				</Sider>
				<Content style={{ height: "100vh", overflowY: "auto" }}>
					<Header
						style={{ display: "flex", alignItems: "center" }}
						className="flex justify-between items-center"
					>
						<figure className="flex-1 flex justify-start items-center gap-4">
							<img className="w-12" src={logo} alt="Logo" />
							<figcaption className="text-white text-2xl font-bold">
								OceanCapp University
							</figcaption>
						</figure>
						<Menu
							className="hidden md:block flex-1"
							theme="dark"
							mode="horizontal"
							selectedKeys={getSelectedKey()}
							items={menuItems}
						/>
					</Header>
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
