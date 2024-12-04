import axios from "axios";

export async function fetch_entities() {
	//return entity;
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

export async function fetch_wells() {
	//return entity;
	try {
		const response = await axios.get(process.env.REACT_APP_SERVICES + "/wells");
		return response.data;
	} catch (error) {
		console.error("Error fetching entities:", error);
		throw error;
	}
}

export async function fetch_performance() {
	try {
		const response = await axios.get(process.env.REACT_APP_SERVICES + "/wells");
		return response.data;
	} catch (error) {
		console.error("Error fetching performance data:", error);
		throw error;
	}
}

export async function fetch_action_plan() {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/action-plan"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching action plans:", error);
		throw error;
	}
}
