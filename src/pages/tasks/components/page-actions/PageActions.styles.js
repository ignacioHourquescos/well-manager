import styled from "styled-components";

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0;
	padding-bottom: 0.3rem;
`;

const StatisticsContainer = styled.div`
	display: flex;
	gap: 20px; // Adds space between the statistics
`;

const PageTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.5rem;
	width: 200px;
`;

const ButtonContainer = styled.div`
	transform: translateY(20px);
`;

export const Styled = {
	StatisticsContainer,
	FlexContainer,
	PageTitle,
	ButtonContainer,
};
