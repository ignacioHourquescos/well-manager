import React, { useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Styled } from "./LayoutGeneral.styles";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import GeneralFilter from "./general-filter/GeneralFilter";

const { Sider, Header, Content } = Layout;
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
	const [collapsed, setCollapsed] = useState(() => {
		const savedState = localStorage.getItem("siderCollapsed");
		return savedState ? JSON.parse(savedState) : false;
	});
	const navigate = useNavigate();
	const location = useLocation();

	const toggleCollapsed = () => {
		const newState = !collapsed;
		setCollapsed(newState);
		localStorage.setItem("siderCollapsed", JSON.stringify(newState));
	};

	const handleMenuClick = (e) => {
		navigate(e.key);
	};

	const shouldShowFilter = !location.pathname.includes("/tasks/");

	return (
		<Layout
			style={{
				minHeight: "100vh",
				backgroundColor: "transparent",
			}}
		>
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
			<Layout>
				{shouldShowFilter && <GeneralFilter />}

				<Content>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							height: "100%",
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}

export default LayoutGeneral;
