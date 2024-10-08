import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
	HomeOutlined,
	UserOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { StyledContent, StyledHeader, StyledLayout } from "./Layout.styles";

const { Header, Sider, Content } = Layout;
const items = [
	{
		key: "1",
		icon: null,
		label: "Option 1",
	},
	{
		key: "2",
		icon: null,
		label: "Option 2",
	},
	{
		key: "3",
		icon: null,
		label: "Option 3",
	},
];

function MainLayout({ children, pageName }) {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" />
				<Button
					type="primary"
					onClick={toggleCollapsed}
					style={{
						marginBottom: 16,
					}}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
				<Menu
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode="inline"
					theme="dark"
					inlineCollapsed={collapsed}
					items={items}
				/>
			</Sider>
			<StyledLayout>
				<StyledHeader>{pageName}asd</StyledHeader>
				<StyledContent>{children}</StyledContent>
			</StyledLayout>
		</Layout>
	);
}

export default MainLayout;
