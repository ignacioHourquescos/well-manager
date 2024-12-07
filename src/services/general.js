import axios from "axios";

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
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/performances"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching performance data:", error);
		throw error;
	}
}

export async function fetch_action_plan() {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/action-plans"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching action plans:", error);
		throw error;
	}
}

export const update_well_performance = async (
	wellId,
	performanceId,
	actionPlanId
) => {
	const response = await axios.put(
		process.env.REACT_APP_SERVICES + `/well/performance`,
		{
			wellId,
			performanceId,
			actionPlanId,
		}
	);
	return response.data;
};

export const fetch_work_order_tasks = async (workOrderId) => {
	const response = await axios.get(
		process.env.REACT_APP_SERVICES + `/work-order-tasks/${workOrderId}`
	);
	return response.data;
};
