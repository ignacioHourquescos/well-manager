import styled, { keyframes } from "styled-components";
import { Layout } from "antd";

const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0px;
	margin-top: 10px;
	justify-items: start;
	margin-bottom: 20px;
`;
const Logo = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 5px;

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

const Header = styled(Layout.Header)`
	position: sticky;
	top: 0;
	z-index: 1;
	width: 100%;
	display: flex;
	align-items: center;
	background-color: white;
	padding: 0% 2.5%;
	height: 4rem;
	border-bottom: 1px solid #e0e0e0;
	background-color: rgb(250, 250, 250);
`;
export const Styled = {
	Logo,
	Icon,
	LogoExtended,
	Header,
};
