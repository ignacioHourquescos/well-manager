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

export const fetch_task_descriptions_by_action_plan = async (actionPlanId) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + `/task-descriptions/${actionPlanId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching task descriptions:", error);
		throw error;
	}
};

export const create_work_order_task = async (taskData) => {
	try {
		const response = await axios.post(
			process.env.REACT_APP_SERVICES + "/work-order-task",
			taskData
		);
		return response.data;
	} catch (error) {
		console.error("Error creating work order task:", error);
		throw error;
	}
};
