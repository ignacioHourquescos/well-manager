import React, { useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Styled } from "./LayoutGeneral.styles";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";

const { Sider } = Layout;
const items = [
	{
		key: "/",
		icon: null,
		label: "Screening",
	},
	{
		key: "/my-tasks",
		icon: null,
		label: "Mis Tareas",
	},
];

function LayoutGeneral({}) {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const handleMenuClick = (e) => {
		navigate(e.key);
	};

	return (
		<Layout style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{ backgroundColor: "#0A1018" }}
			>
				<Styled.Icon onClick={toggleCollapsed}>
					{collapsed ? (
						<Styled.Logo>WM </Styled.Logo>
					) : (
						<Styled.LogoExtended>WELL MANAGER </Styled.LogoExtended>
					)}
				</Styled.Icon>

				<Menu
					selectedKeys={[location.pathname]}
					mode="inline"
					theme="dark"
					inlineCollapsed={false}
					items={items}
					onClick={handleMenuClick}
				/>
			</Sider>
			{/* aca en Outlet se inyecatn las diferentes paginas */}
			<Outlet />
		</Layout>
	);
}

export default LayoutGeneral;

{
	/* Commented out for now
					{collapsed ? (
						<RiArrowRightWideLine
							style={{
								fontSize: "2rem",
								cursor: "pointer",

								color: "white",
							}}
						/>
					) : (
						<RiArrowLeftWideLine
							style={{
								fontSize: "2rem",
								cursor: "pointer",

								color: "white",
							}}
						/>
					)}
					*/
}
