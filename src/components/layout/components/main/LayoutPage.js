import React from "react";
import { Styled } from "./LayoutPage.styles";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { RiArrowLeftWideLine } from "react-icons/ri";

const { Title } = Typography;
function LayoutPage({ pageName, children }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<Styled.Inner>
			<Styled.Header>
				{pageName !== "Screening" && (
					<RiArrowLeftWideLine
						onClick={goBack}
						style={{
							marginRight: "10px",
							fontSize: "2rem",

							cursor: "pointer",
						}}
					/>
				)}
				<Title level={3}>{pageName}</Title>
			</Styled.Header>
			<Styled.Content>{children}</Styled.Content>
		</Styled.Inner>
	);
}

export default LayoutPage;
