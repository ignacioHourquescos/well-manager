import { Typography, Layout, Table } from "antd";
import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../services/general";
import LayoutPage from "../../components/layout/components/main/LayoutPage";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

function Home() {
	const [wells, setWells] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			title: "Pozo",
			dataIndex: "pozo",
			render: (text, record) => <Link to={`/well/${record.pozo}`}>{text}</Link>,
		},
		{
			title: "Performance",
			dataIndex: "performance",
		},
		{
			title: "Action Plan",
			dataIndex: "action-plan",
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
			title: "Actions",
			dataIndex: "actions",
		},
	];

	useEffect(() => {
		async function loadArticles() {
			try {
				const data = await fetchArticles();
				setWells(data);
			} catch (err) {
				setError("Failed to fetch articles");
			} finally {
				setLoading(false);
			}
		}
		loadArticles();
	}, []);

	return (
		<LayoutPage pageName="Screening">
			<Table columns={columns} dataSource={wells} size="middle" />
		</LayoutPage>
	);
}

export default Home;
