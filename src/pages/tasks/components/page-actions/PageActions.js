import { Button, Statistic, Typography } from "antd";
import React from "react";
import { FlexContainer, StatisticsContainer } from "./PageActions.styles.js";

const { Title } = Typography;

const PageActions = ({
	children,
	showPerformanceModificationModal,
	...props
}) => {
	return (
		<FlexContainer {...props}>
			<StatisticsContainer>
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
			</StatisticsContainer>
			<Button
				type="primary"
				size="large"
				onClick={() => showPerformanceModificationModal(true)}
			>
				Change performance
			</Button>
		</FlexContainer>
	);
};

export default PageActions;
