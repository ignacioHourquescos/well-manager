import React from "react";
import { Styled } from "./LayoutPage.styles";
import { Tabs, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { RiArrowLeftWideLine } from "react-icons/ri";

const { Title } = Typography;
function LayoutPage({ pageName, children, pageActions }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

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

			<Styled.Content>{children}</Styled.Content>
		</Styled.Inner>
	);
}

export default LayoutPage;
