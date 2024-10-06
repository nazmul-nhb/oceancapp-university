import { Tag } from "antd";
import { getColorForFirstCharacter } from "color-generator-fl";
import React from "react";

interface TagsProps {
	subjects: string[];
}

const SubjectsTags: React.FC<TagsProps> = ({ subjects }) => {
	return (
		<div>
			{subjects.map((subject, idx) => (
				<Tag
					key={idx}
					color={getColorForFirstCharacter(subject) as string}
					style={{
						margin: "4px 8px 4px 0",
						padding: "2.5px 5px",
						fontSize: 13,
						cursor: "pointer",
					}}
				>
					{subject}
				</Tag>
			))}
		</div>
	);
};

export default SubjectsTags;
