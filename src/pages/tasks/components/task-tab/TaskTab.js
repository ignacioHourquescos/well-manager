import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import TasksTable from "./components/table/TaskTable";
import TaskDetail from "./components/task-detail/TaskDetail";
import { fetch_task_by_id } from "../../../../services/general";

function TaskTab({ taskData, entity_comments, wellState }) {
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskDetails, setTaskDetails] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleViewClick = async (taskId) => {
		try {
			setLoading(true);

			// Then fetch and set the detailed data
			console.log("Fetching details for task ID:", taskId);
			const details = await fetch_task_by_id(taskId);
			console.log("Received task details:", details);
			setTaskDetails(details);
		} catch (error) {
			console.error("Error fetching task details:", error);
			message.error("Failed to load task details");
		} finally {
			setLoading(false);
		}
	};

	const refreshTasks = async () => {
		try {
			if (taskData.refresh) {
				await taskData.refresh();
			}
			setSelectedTask(null);
			setTaskDetails(null);
		} catch (error) {
			console.error("Error refreshing tasks:", error);
			message.error("Failed to refresh tasks");
		}
	};

	return (
		<Row gutter={24}>
			<Col span={12}>
				<TasksTable
					tasks={taskData.tasks}
					loading={taskData.loading}
					handleViewClick={handleViewClick}
				/>
			</Col>
			<Col span={12}>
				<TaskDetail
					initialValues={selectedTask}
					entityComments={entity_comments}
					selectedTask={selectedTask}
					taskDetails={taskDetails}
					loading={loading}
					performance={wellState.performance}
					onSuccess={refreshTasks}
				/>
			</Col>
		</Row>
	);
}

export default TaskTab;
