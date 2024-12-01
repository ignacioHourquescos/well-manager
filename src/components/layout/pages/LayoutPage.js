import React from "react";
import { Styled } from "./LayoutPage.styles";
import { Tabs, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { RiArrowLeftWideLine } from "react-icons/ri";

const { Title } = Typography;
function LayoutPage({
	pageName,
	children,
	pageActions,
	type,
	sidebar,
	secondaryTitle,
}) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	if (type === "side-bar-layout") {
		return (
			<>
				<Styled.Sidebar>{sidebar}</Styled.Sidebar>
				<Styled.Main>
					<Styled.Inner>
						<Styled.Content>{children}</Styled.Content>
					</Styled.Inner>
				</Styled.Main>
			</>
		);
	}

	if (type === "standard-layout" || type === undefined) {
		return (
			<Styled.Inner>
				<Styled.Content>{children}</Styled.Content>
			</Styled.Inner>
		);
	}
}

export default LayoutPage;
