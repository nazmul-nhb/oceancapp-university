import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { logo, navbarMenu, sidebarMenu } from "../utilities/constants";
import { useMediaQuery } from "react-responsive";
import type { MenuItem } from "../types/interfaces";

const { Header, Sider } = Layout;

const Navbar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const isLargeOrXL = useMediaQuery({ query: "(min-width: 1024px)" });
	const sidebarRef = useRef<HTMLDivElement>(null);
	const navButtonRef = useRef<HTMLButtonElement>(null);
	const location = useLocation();

	// Get keys for selected route
	const getSelectedKey = (menuItems: MenuItem[]) => {
		const currentPath = location.pathname;
		const selectedKeys = menuItems
			.map((item: MenuItem) => {
				if (item.children) {
					return item.children.find((child) => {
						// Check if `label` is a React element before accessing `props`
						return (
							React.isValidElement(child.label) &&
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							child.label.props.to === currentPath
						);
					})
						? item.key
						: null;
				} else {
					// Check if `label` is a React element before accessing `props`
					return React.isValidElement(item.label) &&
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						item.label.props.to === currentPath
						? item.key
						: null;
				}
			})
			.filter((key): key is string => key !== null);

		return selectedKeys.length > 0 ? selectedKeys : ["1"];
	};

	// When clicked outside sidebar hide it
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node) &&
				navButtonRef.current &&
				!navButtonRef.current.contains(e.target as Node)
			) {
				setSidebarVisible(false);
				setCollapsed(true);
			}
		};

		document.addEventListener("mouseup", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, [sidebarRef]);

	return (
		<>
			<Sider
				ref={sidebarRef}
				className={`${
					sidebarVisible
						? "w-full"
						: "-translate-x-full w-0 md:w-full md:translate-x-0"
				}
					md:block h-[calc(100vh-64px)] overflow-y-auto transition-all duration-500 overflow-x-hidden absolute top-16 backdrop-filter backdrop-blur-sm bg-oceancapp-primary/85 z-10`}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Menu
					className="!bg-transparent"
					mode="inline"
					theme="dark"
					selectedKeys={getSelectedKey(sidebarMenu)}
					items={sidebarMenu}
				/>
			</Sider>
			<Header className="bg-opacity-30 flex justify-start md:justify-between items-center sticky top-0 w-full px-0 md:px-4 backdrop-filter backdrop-blur-sm bg-oceancapp-primary/85 z-10">
				<Button
					ref={navButtonRef}
					className="md:hidden text-white transition-all duration-500 hover:!text-blue-300"
					type="text"
					icon={
						collapsed ? (
							<MenuUnfoldOutlined className="!text-3xl" />
						) : (
							<MenuFoldOutlined className="!text-3xl" />
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
						<img className="w-8 md:w-12" src={logo} alt="Logo" />
						<figcaption className="text-white text-lg md:text-2xl font-bold font-hallelujah">
							OceanCapp University
						</figcaption>
					</figure>
				</Link>
				{/* Show menu only if the device screen size >= 1024px */}
				{isLargeOrXL && (
					<Menu
						className="font-bold text-lg !bg-transparent"
						// itemIcon={null}
						theme="dark"
						mode="horizontal"
						selectedKeys={getSelectedKey(navbarMenu)}
						items={navbarMenu}
					/>
				)}
			</Header>
		</>
	);
};

export default Navbar;
