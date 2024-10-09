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

	width: 100%;
	line-height: 3rem;
	padding-bottom: 0.8rem;
	height: 5rem; // Add a fixed height to ensure vertical centering
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
