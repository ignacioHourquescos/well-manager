import { Typography, Layout, Drawer, Table, List, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_entities } from "../../services/general";
import tasks from "../../services/task.json";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import { Link } from "react-router-dom";
import SearchMenu from "./components/SearchMenu";

const { Title } = Typography;
const { Content } = Layout;

function Home() {
	const [entities, setEntities] = useState([]);
	const [filteredEntities, setFilteredEntities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [selectedEntityTasks, setSelectedEntityTasks] = useState([]);
	const [selectedEntity, setSelectedEntity] = useState(null);

	const showTasksDrawer = async (entity) => {
		setLoading(true);
		try {
			setSelectedEntityTasks(tasks);
			setDrawerVisible(true);
			setSelectedEntity(entity);
		} catch (err) {
			setError("Failed to fetch tasks");
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			title: "Entidad",
			dataIndex: "entity",
			render: (text, record) => (
				<Link
					style={{ color: "#19519f", fontWeight: "600" }}
					to={`/tasks/${record.entity}?${record.performance.code}?${record.action_plan.label}`}
				>
					{text}
				</Link>
			),
		},
		{
			title: "Performance",
			dataIndex: "performance",
			render: (performance) => performance.label,
		},
		{
			title: "Action Plan",
			dataIndex: "action_plan",
			render: (action_plan) => action_plan.label,
		},
		{
			title: "Fecha",
			dataIndex: "date",
		},
		{
			title: "Indicators",
			dataIndex: "indicators",
		},
		{
			title: "Tareas",
			dataIndex: "actions",
			render: (text, record) => (
				<a
					style={{ color: "#19519f", fontWeight: "600" }}
					onClick={() => showTasksDrawer(record)}
				>
					Tareas
				</a>
			),
		},
	];

	const drawerTitle = (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<span>Tareas Pendientes</span>
			{selectedEntity && (
				<Link
					to={`/tasks/${selectedEntity.entity}?${selectedEntity.performance.code}?${selectedEntity.action_plan.label}`}
					style={{ fontSize: "14px" }}
				>
					Ver más detalle →
				</Link>
			)}
		</div>
	);

	useEffect(() => {
		async function loadEntities() {
			try {
				const data = await fetch_entities();
				setEntities(data);
				setFilteredEntities(data);
			} catch (err) {
				setError("Failed to fetch articles");
			} finally {
				setLoading(false);
			}
		}
		loadEntities();
	}, []);

	const filterEntities = (filters) => {
		const { entity, performance, action_plan } = filters;
		console.log(filters);

		setLoading(true); // Start loading

		// Simulate a delay between 100ms and 400ms
		const delay = Math.floor(Math.random() * (800 - 250 + 1) + 100);

		setTimeout(() => {
			const filtered = entities.filter((item) => {
				//prettier-ignore
				return (
					(entity? item.entity.toLowerCase().includes(entity.toLowerCase()): true) &&
					(performance ? item.performance.code === performance : true) &&
					(action_plan? item.action_plan.code.toLowerCase().includes(action_plan.toLowerCase()): true)
				);
			});
			console.log(filtered);
			setFilteredEntities(filtered);
			setLoading(false); // Stop loading after filtering is done
		}, delay);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Block":
				return "red";
			case "InProgress":
				return "blue";
			case "Done":
				return "green";
			default:
				return "default";
		}
	};

	return (
		<LayoutPage
			pageName="Screening"
			secondaryTitle="Listado de Entidades"
			type="side-bar-layout"
			sidebar={<SearchMenu onFilter={filterEntities} />}
		>
			<br />

			<Table
				columns={columns}
				dataSource={filteredEntities}
				size="middle"
				pagination={{ pageSize: 13 }}
				loading={loading}
				style={{ padding: "1%" }}
			/>

			<Drawer
				title={drawerTitle}
				placement="right"
				onClose={() => setDrawerVisible(false)}
				visible={drawerVisible}
				width={500}
			>
				{" "}
				<List
					itemLayout="horizontal"
					dataSource={selectedEntityTasks}
					renderItem={(item) => (
						<div
							style={{
								marginBottom: "10px",
								borderBottom: "1px solid #e8e8e8",
								paddingBottom: "10px",
							}}
						>
							<Tag
								color={getStatusColor(item.status)}
								style={{ marginLeft: 8 }}
							>
								{item.status}
							</Tag>
							<span style={{ textAlign: "left" }}>{item.task}</span>
						</div>
					)}
				/>
			</Drawer>
		</LayoutPage>
	);
}

export default Home;
