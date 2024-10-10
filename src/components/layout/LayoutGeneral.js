import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import {
	HomeOutlined,
	UserOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import LayoutMain from "./components/main/LayoutPage";

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

function LayoutGeneral({ children, pageName }) {
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
			{/* aca en Outlet se inyecatn las diferentes paginas */}
			<Outlet />
		</Layout>
	);
}

export default LayoutGeneral;
