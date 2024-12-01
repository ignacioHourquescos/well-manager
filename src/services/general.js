import axios from "axios";
import entity from "./entity.json";
import task from "./task.json";

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

export async function fetch_performances() {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/performance"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching performance data:", error);
		throw error;
	}
}

export async function fetch_action_plans() {
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
