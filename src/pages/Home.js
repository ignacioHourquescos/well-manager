import { Typography, Layout } from "antd";
import React, { useState, useEffect } from "react";
import { fetchArticles } from "../services/general";

const { Title } = Typography;
const { Content } = Layout;

function Home() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadArticles() {
			try {
				const data = await fetchArticles();
				setArticles(data);
			} catch (err) {
				setError("Failed to fetch articles");
			} finally {
				setLoading(false);
			}
		}
		loadArticles();
	}, []);

	return <Layout pageName="HomePage"> {articles}</Layout>;
}

export default Home;
