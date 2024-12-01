import styled from "styled-components";
import { Layout, Tag } from "antd";

export const Styled = {
	Header: styled(Layout.Header)`
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
	`,
	FilterContainer: styled.div`
		display: flex;
		align-items: center;
		gap: 8px;
	`,

	AddFilterButton: styled.span`
		color: #1890ff;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	`,

	FilterSection: styled.div`
		margin-bottom: 24px;
	`,

	ModalContent: styled.div`
		display: flex;
		gap: 24px;
	`,

	FilterColumn: styled.div`
		flex: 1;
		min-width: 200px;
	`,

	FilterTag: styled(Tag)`
		background: transparent;
		border-radius: 20px;
		border: 1px solid #d9d9d9;
		padding: 4px 8px;
		margin-right: 2px !important;
		.anticon-close {
			color: #666;
		}
	`,

	BateriaSection: styled.div`
		display: flex;
		gap: 24px;
	`,

	BateriaColumn: styled.div`
		flex: 1;
	`,
};
