import axios from "axios";

export const fetch_wells = async (wellId) => {
	try {
		// Construct the URL with the optional wellId as a query parameter
		const url =
			process.env.REACT_APP_SERVICES +
			`/wells${wellId ? `?wellId=${wellId}` : ""}`;

		const response = await axios.get(url); // Make the GET request
		return response.data; // Return the data from the response
	} catch (error) {
		console.error("Error fetching wells:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
};

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

export const fetch_task_by_id = async (taskId) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + `/task/${taskId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching task details:", error);
		throw error;
	}
};

// Add this new function to your existing services
export const update_task = async (taskData) => {
	try {
		const response = await axios.put(process.env.REACT_APP_SERVICES + "/task", {
			id: taskData.id,
			id_work_order: taskData.id_work_order,
			task_id: taskData.task_id,
			responsable: taskData.responsable,
			priority: taskData.priority,
			status: taskData.status,
			start_date: taskData.start_date,
			due_date: taskData.due_date,
			additional_comments: taskData.additional_comments,
		});
		return response.data;
	} catch (error) {
		console.error("Error updating task:", error);
		throw error;
	}
};

export const fetch_personal_tasks = async (responsable) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + `/tasks/personal/${responsable}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching personal tasks:", error);
		throw error;
	}
};

export const fetch_task_statuses = async () => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_SERVICES + "/tasks/status"
		);
		return response.data; // Return the data from the response
	} catch (error) {
		console.error("Error fetching task statuses:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
};
