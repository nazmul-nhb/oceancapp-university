import React from "react";
import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
	return (
		<AntFooter className="text-center bg-oceancapp-primary/85 text-white">
			OceanCapp University &copy; {new Date().getFullYear()}
		</AntFooter>
	);
};

export default Footer;
