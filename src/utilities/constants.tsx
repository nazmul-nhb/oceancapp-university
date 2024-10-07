import logo from "../assets/oceancapp.png";
import empty from "../assets/empty.svg";

import { NavLink } from "react-router-dom";
import { PiBooks } from "react-icons/pi";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuItem } from "../types/interfaces";

// Navbar & Sidebar menu items
export const sidebarMenu: MenuItem[] = [
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
		label: "Dashboard",
		children: [
			{
				key: "4",
				label: (
					<NavLink to="/#current-courses">Current Courses</NavLink>
				),
			},
			{
				key: "5",
				label: (
					<NavLink to="/#finished-courses">Finished Courses</NavLink>
				),
			},
			{
				key: "6",
				label: (
					<NavLink to="/#upcoming-events">Upcoming Events</NavLink>
				),
			},
		],
	},
];

// Navbar menu items
export const navbarMenu: MenuItem[] = [
	{
		key: "1",
		label: <NavLink to="/">Student Portal</NavLink>,
	},
	{
		key: "2",
		label: <NavLink to="/faculty-overview">Faculty Overview</NavLink>,
	},
	{
		key: "3",
		label: <NavLink to="/course-registration">Enroll in Courses</NavLink>,
	},
	{
		key: "sub1",
		icon: <UserOutlined />,
		label: "Dashboard",
		children: [
			{
				key: "4",
				label: (
					<NavLink to="/#current-courses">Current Courses</NavLink>
				),
			},
			{
				key: "5",
				label: (
					<NavLink to="/#finished-courses">Finished Courses</NavLink>
				),
			},
			{
				key: "6",
				label: (
					<NavLink to="/#upcoming-events">Upcoming Events</NavLink>
				),
			},
		],
	},
];

export { logo, empty };
