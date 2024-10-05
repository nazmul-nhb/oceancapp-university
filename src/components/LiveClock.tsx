import React, { useEffect, useState } from "react";
import { FloatButton, Tooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const LiveClock: React.FC = () => {
	const [currentTime, setCurrentTime] = useState<string>(
		moment().format("hh:mm:ss a")
	);

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentTime(moment().format("hh:mm:ss a"));
		}, 1000);

		return () => clearInterval(intervalID);
	}, []);

	return (
		<Tooltip title={moment().format("dddd, MMMM DD, YYYY")}>
			<FloatButton
				shape="square"
				type="primary"
				description={currentTime}
				style={{ insetInlineEnd: 12, insetBlockEnd: 12 }}
				icon={<ClockCircleOutlined />}
				className="px-2 w-24 h-14 !bg-opacity-30 backdrop-filter backdrop-blur-md z-10 rounded-lg"
			/>
		</Tooltip>
	);
};

export default LiveClock;
