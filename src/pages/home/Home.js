import { Typography, Layout, Drawer, Table, List, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_entities } from "../../services/general";
import tasks from "../../services/task.json";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import { Link } from "react-router-dom";
import SearchMenu from "./components/SearchMenu";
import { useFilters } from "../../context/FilterContext";

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
	const { filters } = useFilters();

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
					to={`/tasks/${record.id}`}
				>
					{record.code}
				</Link>
			),
		},
		{
			title: "Performance",
			dataIndex: "performance",
			render: (performance) => performance,
		},
		{
			title: "Action Plan",
			dataIndex: "action_plan",
			render: (action_plan) => action_plan,
		},
		{
			title: "Fecha",
			dataIndex: "date",
		},
		{
			title: "type",
			dataIndex: "well_type",
			render: (type) => type,
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
					to={`/tasks/${selectedEntity.entity}?${selectedEntity.performance.code}?${selectedEntity.action_plan}`}
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
				applyAllFilters(data);
			} catch (err) {
				setError("Failed to fetch articles");
			} finally {
				setLoading(false);
			}
		}
		loadEntities();
	}, []);

	useEffect(() => {
		applyAllFilters(entities);
	}, [filters, entities]);

	const applyAllFilters = (data) => {
		let filtered = [...data];

		if (filters.wellTypes?.length > 0) {
			filtered = filtered.filter((item) =>
				filters.wellTypes.includes(item.well_type)
			);
		}

		if (filters.entity) {
			filtered = filtered.filter((item) =>
				item.id.toLowerCase().includes(filters.entity.toLowerCase())
			);
		}

		if (filters.performance) {
			filtered = filtered.filter(
				(item) => item.performance.code === filters.performance
			);
		}

		if (filters.action_plan) {
			filtered = filtered.filter(
				(item) => item.action_plan === filters.action_plan
			);
		}

		if (filters.projects?.length > 0) {
			filtered = filtered.filter((item) =>
				filters.projects.includes(item.WF_project)
			);
		}

		setFilteredEntities(filtered);
	};

	const filterEntities = (searchFilters) => {
		setLoading(true);
		const delay = Math.floor(Math.random() * (800 - 250 + 1) + 100);

		setTimeout(() => {
			applyAllFilters(entities);
			setLoading(false);
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
			pageName="Buscador"
			secondaryTitle="Listado de Entidades"
			type="side-bar-layout"
			sidebar={<SearchMenu onFilter={filterEntities} />}
		>
			<br />

			<Table
				columns={columns}
				dataSource={filteredEntities}
				size="middle"
				pagination={{ pageSize: 15 }}
				loading={loading}
				style={{ padding: "%" }}
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
