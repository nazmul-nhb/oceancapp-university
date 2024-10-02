import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import { logo, menuItems } from "../utilities/constants";

const { Header, Content, Footer, Sider } = Layout;

const Root: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [sidebarVisible, setSidebarVisible] = useState(false);
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
		<Layout className="min-h-screen">
			<Layout className="relative h-[calc(100vh-64px)]">
				<Sider
					className={`${
						sidebarVisible
							? "opacity-100 w-full"
							: "opacity-0 -translate-x-full w-0 md:opacity-100 md:w-full md:translate-x-0"
					}
					 md:block h-[calc(100vh-64px)] overflow-y-auto transition-all duration-700 overflow-x-hidden absolute top-16 backdrop-filter backdrop-blur-sm bg-opacity-75`}
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					{/* <figure className="my-2 ml-6">
						<img className="w-12" src={logo} alt="Logo" />
					</figure> */}
					<Menu
						mode="inline"
						theme="dark"
						selectedKeys={getSelectedKey()}
						items={menuItems}
					/>
				</Sider>
				<Content className="overflow-y-auto">
					<Header className="flex justify-between items-center sticky top-0 w-full px-4">
						<Button
							className="md:hidden"
							type="text"
							icon={
								collapsed ? (
									<MenuUnfoldOutlined />
								) : (
									<MenuFoldOutlined />
								)
							}
							onClick={() => {
								setSidebarVisible(!sidebarVisible);
							}}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
						<Link className="flex-1" to="/">
							<figure className="flex justify-start items-center gap-4">
								<img
									className="w-8 md:w-12"
									src={logo}
									alt="Logo"
								/>
								<figcaption className="text-white text-lg md:text-2xl font-bold">
									OceanCapp University
								</figcaption>
							</figure>
						</Link>
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
