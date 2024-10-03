export interface MenuItem {
	key: string;
	icon?: React.ReactNode;
	label: React.ReactNode | string;
	children?: MenuItem[];
}
