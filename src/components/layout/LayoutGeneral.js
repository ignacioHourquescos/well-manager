import React, { useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
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

const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const items = [
	{
		key: "1",
		icon: null,
		label: "Screening",
	},
	{
		key: "2",
		icon: null,
		label: "Mis Tareas",
	},
];

function LayoutGeneral({ children, pageName }) {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Layout style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Title level={5} style={{ color: "#FFFFFF", padding: "0.75rem" }}>
					WELL MANAGER
				</Title>
				{/* <Button
					type="primary"
					onClick={toggleCollapsed}
					style={{
						marginBottom: 16,
					}}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button> */}
				<Menu
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode="inline"
					theme="dark"
					inlineCollapsed={false}
					items={items}
				/>
			</Sider>
			{/* aca en Outlet se inyecatn las diferentes paginas */}
			<Outlet />
		</Layout>
	);
}

export default LayoutGeneral;
