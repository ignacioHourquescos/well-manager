import { Typography, Layout, Table } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_entities } from "../../services/general";
import LayoutPage from "../../components/layout/components/main/LayoutPage";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

function Home() {
	const [entities, setEntities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			title: "Entidad",
			dataIndex: "pozo",
			render: (text, record) => (
				<Link to={`/entity/${record.pozo}`}>{text}</Link>
			),
		},
		{
			title: "Performance",
			dataIndex: "performance",
		},
		{
			title: "Action Plan",
			dataIndex: "task",
		},
		{
			title: "Fecha",
			dataIndex: "fecha",
		},
		{
			title: "Indicators",
			dataIndex: "indicators",
		},
		{
			title: "Tareas",
			dataIndex: "actions",
			render: (text, record) => <Link to={`/tasks/${record.pozo}`}>Ver</Link>,
		},
	];

	useEffect(() => {
		async function loadEntities() {
			try {
				const data = await fetch_entities();
				setEntities(data);
			} catch (err) {
				setError("Failed to fetch articles");
			} finally {
				setLoading(false);
			}
		}
		loadEntities();
	}, []);

	return (
		<LayoutPage pageName="Screening">
			<Table columns={columns} dataSource={entities} size="middle" />
		</LayoutPage>
	);
}

export default Home;
