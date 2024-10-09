import axios from "axios";

export async function fetchArticles() {
	try {
		const response = await axios.get(process.env.REACT_APP_SERVICES + "/wells");
		return response.data;
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
}
