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

	const renderContent = (contentTitle) => (
		<>
			<Styled.HeaderStandard>
				<Styled.PageTitle>
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
					<Title level={3}>{contentTitle}</Title>
				</Styled.PageTitle>
				<Styled.PageActions>{pageActions}</Styled.PageActions>
			</Styled.HeaderStandard>
			<Styled.Content>{children}</Styled.Content>
		</>
	);

	if (type === "side-bar-layout") {
		return (
			<>
				<Styled.Sidebar>
					{/* Add your sidebar content here */}
					<Styled.HeaderSideMenu>
						<Styled.PageTitle style={{ width: "100%" }}>
							{pageName !== "Screening" && (
								<RiArrowLeftWideLine
									onClick={goBack}
									style={{
										marginRight: "0px",
										fontSize: "3rem",
										cursor: "pointer",
									}}
								/>
							)}
							<Title level={3}>{pageName}</Title>
						</Styled.PageTitle>
					</Styled.HeaderSideMenu>
					{sidebar}
				</Styled.Sidebar>

				<Styled.Main>
					<Styled.Inner>{renderContent(secondaryTitle)}</Styled.Inner>
				</Styled.Main>
			</>
		);
	}

	// Default to StandardLayout
	if (type === "standard-layout" || type === undefined) {
		return <Styled.Inner>{renderContent(pageName)}</Styled.Inner>;
	}

	return <Styled.Inner>{renderContent(pageName)}</Styled.Inner>;
}

export default LayoutPage;
