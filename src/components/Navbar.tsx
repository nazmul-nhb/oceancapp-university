import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { logo, menuItems } from "../utilities/constants";
import { useMediaQuery } from "react-responsive";

const { Header, Sider } = Layout;

const Navbar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });

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
						? "opacity-100 w-full"
						: "opacity-0 -translate-x-full w-0 md:opacity-100 md:w-full md:translate-x-0"
				}
					 md:block h-[calc(100vh-64px)] overflow-y-auto transition-all duration-700 overflow-x-hidden absolute top-16 backdrop-filter backdrop-blur-sm bg-opacity-75`}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Menu
					mode="inline"
					theme="dark"
					selectedKeys={getSelectedKey()}
					items={menuItems}
				/>
			</Sider>
			<Header className="flex justify-start md:justify-between items-center sticky top-0 w-full px-0 md:px-4">
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
						<figcaption className="text-white text-lg md:text-2xl font-bold">
							OceanCapp University
						</figcaption>
					</figure>
				</Link>
				{isMediumOrLarger && (
					<Menu
						theme="dark"
						mode="horizontal"
						selectedKeys={getSelectedKey()}
						items={menuItems}
					/>
				)}
			</Header>
		</>
	);
};

export default Navbar;
