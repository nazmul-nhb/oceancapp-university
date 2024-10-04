import logo from "../assets/oceancapp.png";
import empty from "../assets/empty.svg";

import { NavLink } from "react-router-dom";
import { PiBooks } from "react-icons/pi";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuItem } from "../types/interfaces";

// Navbar & Sidebar menu items
const menuItems: MenuItem[] = [
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

export { logo, empty, menuItems };
