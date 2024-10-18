import styled, { keyframes } from "styled-components";

const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0px;
	margin-top: 35px;
	justify-items: start;
	margin-bottom: 20px;
`;
const Logo = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 5px;
	background-color: gray; // A dark slate gray color related to petroleum
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Slight drop shadow
	text-align: center;
	font-size: 15px;
	color: white;
	padding-top: 8px;
`;
const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const LogoExtended = styled.div`
	height: 40px;
	border-radius: 5px;
	width: 100%;
	text-align: start;
	font-size: 15px;
	color: white;
	padding-top: 8px;
	margin-left: 25px;
	animation: ${scaleIn} 0.2s ease-out;
`;

export const Styled = {
	Logo,
	Icon,
	LogoExtended,
};
