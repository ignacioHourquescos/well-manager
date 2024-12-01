import { Typography, Layout, Table } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_entities } from "../../services/general";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

function Home() {
	const [entities, setEntities] = useState([]);
	const [filteredEntities, setFilteredEntities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			title: "Entidad",
			dataIndex: "entity",
			render: (text, record) => <>{record.id}</>,
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
			title: "Indicators",
			dataIndex: "indicators",
		},
		{
			title: "Tareas",
			dataIndex: "actions",
			render: (text, record) => (
				<Link
					to={`/tasks/${record.entity}?${record.performance}?${record.action_plan}`}
				>
					Ver
				</Link>
			),
		},
	];

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

	return (
		<LayoutPage
			pageName="Mis Tareass"
			secondaryTitle="Listado de Entidades"
			type="standard-layout"
		>
			<br />

			<Table
				columns={columns}
				dataSource={filteredEntities}
				size="middle"
				pagination={{ pageSize: 13 }}
				loading={loading}
			/>
		</LayoutPage>
	);
}

export default Home;
