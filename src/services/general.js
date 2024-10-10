import axios from "axios";

export async function fetch_entities() {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/entity"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching entities:", error);
		throw error;
	}
}

export async function fetch_actions() {
	try {
		const response = await axios.get(process.env.REACT_APP_SERVICES + "/task");
		return response.data;
	} catch (error) {
		console.error("Error fetching actions:", error);
		throw error;
	}
}
