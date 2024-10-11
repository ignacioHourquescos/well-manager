import { Button } from "antd";
import styled from "styled-components";

export const Styled = {
	Container: styled.div`
		padding: 0 1rem;
		padding-left: 0.5rem;
		padding-right: 1.5rem;
		position: relative;
		height: 60vh; /* Full viewport height */
		overflow-y: auto; /* Enable vertical scrolling */
		/* Webkit browsers (Chrome, Safari, newer versions of Edge) */
		/* Webkit browsers (Chrome, Safari, newer versions of Edge) */
		&::-webkit-scrollbar {
			width: 4px; // Made slightly thinner
		}

		&::-webkit-scrollbar-track {
			background: white; // Lighter shade for the track
		}

		&::-webkit-scrollbar-thumb {
			background: #d0d0d0; // Much lighter shade for the thumb
			border-radius: 10px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #b0b0b0; // Slightly darker on hover, but still light
		}

		/* Firefox */
		scrollbar-width: 4px;
		scrollbar-color: #d0d0d0 #ffffff; // Matching colors for Firefox
	`,
	ButtonContainer: styled.div`
		position: fixed;
		bottom: 40px; /* Adjust this value to set the distance from the bottom */
		right: 45px; /* Adjust this value to set the distance from the right */
		z-index: 1000;
	`,
};
