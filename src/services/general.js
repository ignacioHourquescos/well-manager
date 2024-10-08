import axios from "axios";

export async function fetchArticles() {
	try {
		const response = await axios.get(
			"https://app-232641105784.us-central1.run.app/articles"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
}
