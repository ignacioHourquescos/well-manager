import styled from "styled-components";

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 2% 2.5%;
`;
const Header = styled.header`
	display: flex;
	align-items: center;
	align-content: center;

	line-height: 3rem;

	height: 4rem; // Add a fixed height to ensure vertical centering
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 0rem;
`;

const PageActions = styled.div`
	display: flex;
	flex-direction: row;

	width: 100%;
`;

const PageTitle = styled.div`
	display: flex;
	width: 35%;
`;

export const Styled = {
	Inner,
	Header,
	Content,
	PageActions,
	PageTitle,
};
