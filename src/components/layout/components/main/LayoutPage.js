import React from "react";
import { Styled } from "./LayoutPage.styles";
import { Tabs, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { RiArrowLeftWideLine } from "react-icons/ri";

const { Title } = Typography;
function LayoutPage({ pageName, children, pageActions }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	const items = [
		{
			key: "1",
			label: "Tareas",
			children: null,
		},
		{
			key: "2",
			label: "Historial",
		},
		{
			key: "3",
			label: "Tab adicional",
		},
	];

	return (
		<Styled.Inner>
			<Styled.Header>
				<Styled.PageTitle>
					{pageName !== "Screening" && (
						<RiArrowLeftWideLine
							onClick={goBack}
							style={{
								marginRight: "10px",
								fontSize: "3rem",

								cursor: "pointer",
							}}
						/>
					)}

					<Title level={1}>{pageName}</Title>
				</Styled.PageTitle>
				<Styled.PageActions>{pageActions}</Styled.PageActions>
			</Styled.Header>
			{pageName !== "Screening" && (
				<Tabs
					defaultActiveKey="1"
					items={items}
					style={{ padding: "0 1rem" }}
				/>
			)}
			<Styled.Content>{children}</Styled.Content>
		</Styled.Inner>
	);
}

export default LayoutPage;
