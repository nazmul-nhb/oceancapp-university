import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useLocation, Link } from "react-router-dom";
import { logo, menuItems } from "../utilities/constants";

const { Header, Content, Footer, Sider } = Layout;

const Root: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const navButtonRef = useRef<HTMLButtonElement>(null);
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

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node) &&
				navButtonRef.current &&
				!navButtonRef.current.contains(e.target as Node)
			) {
				setSidebarVisible(false);
			}
		};

		document.addEventListener("mouseup", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, [sidebarRef]);

	return (
		<Layout className="min-h-screen">
			<Layout className="relative h-[calc(100vh-64px)]">
				<Sider
					ref={sidebarRef}
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
				<Content className="overflow-y-auto oceancapp-scrollbar">
					<Header className="flex justify-start md:justify-between items-center sticky top-0 w-full px-0 md:px-4">
						<Button
							ref={navButtonRef}
							className="md:hidden text-white"
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
								setCollapsed(false);
							}}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
						<Link to="/">
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
							className="hidden md:block"
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
