import React from "react";
import { Styled } from "./LayoutPage.styles";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Title } = Typography;

function LayoutPage({ pageName, children }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<Styled.Inner>
			<Styled.Header>
				{" "}
				<ArrowLeftOutlined
					onClick={goBack}
					style={{ marginRight: "10px", cursor: "pointer" }}
				/>
				<Title level={2}>{pageName}</Title>
			</Styled.Header>
			<Styled.Content>{children}</Styled.Content>
		</Styled.Inner>
	);
}

export default LayoutPage;
