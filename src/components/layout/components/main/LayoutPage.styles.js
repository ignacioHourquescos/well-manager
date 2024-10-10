import styled from "styled-components";

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
	margin: 1% 1.5%;
`;
const Header = styled.header`
	display: flex;
	align-items: center;
	align-content: center;

	width: 100%;
	line-height: 3rem;

	height: 4rem; // Add a fixed height to ensure vertical centering
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Styled = {
	Inner,
	Header,
	Content,
};
