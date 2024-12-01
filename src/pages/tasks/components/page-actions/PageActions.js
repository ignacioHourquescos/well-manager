import { Button, Statistic, Typography } from "antd";
import React from "react";
import { Styled } from "./PageActions.styles.js";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftWideLine } from "react-icons/ri";

const { Title } = Typography;

const PageActions = ({
	children,
	showPerformanceModificationModal,
	...props
}) => {
	const navigate = useNavigate();
	return (
		<Styled.FlexContainer {...props}>
			<Styled.PageTitle>
				<RiArrowLeftWideLine
					onClick={() => navigate("/")}
					style={{
						marginRight: "0px",
						marginLeft: "0px",
						fontSize: "2rem",
						cursor: "pointer",
						transform: "translateX(-10px)",
					}}
				/>
				{props.entityId}
			</Styled.PageTitle>
			<Styled.StatisticsContainer>
				<Statistic
					title="Performance"
					value={props.performance}
					valueRender={(value) => <Title level={5}>{value}</Title>}
				/>
				<Statistic
					title="Action Plan"
					value={props.actionPlan}
					valueRender={(value) => <Title level={5}>{value}</Title>}
				/>
			</Styled.StatisticsContainer>
			<Styled.ButtonContainer>
				<Button
					type="primary"
					size="large"
					onClick={() => showPerformanceModificationModal(true)}
				>
					Change performance
				</Button>
			</Styled.ButtonContainer>
		</Styled.FlexContainer>
	);
};

export default PageActions;
