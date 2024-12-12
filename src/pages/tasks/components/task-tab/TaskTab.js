import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import TasksTable from "./components/table/TaskTable";
import TaskDetail from "./components/task-detail/TaskDetail";
import { fetch_task_by_id } from "../../../../services/general";

function TaskTab({ taskData, entity_comments, wellState }) {
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskDetails, setTaskDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isTableUpdating, setIsTableUpdating] = useState(false);

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
			setIsTableUpdating(true);

			// Call the parent's fetchTasks function
			await taskData.refresh();

			// Then refresh the selected task details if we have one
			if (taskDetails) {
				const updatedDetails = await fetch_task_by_id(taskDetails.id);
				console.log("Updated task details:", updatedDetails);
				setTaskDetails(updatedDetails);

				if (updatedDetails) {
					setSelectedTask(updatedDetails);
				}
			}
		} catch (error) {
			console.error("Error refreshing tasks:", error);
			message.error("Failed to refresh tasks");
		} finally {
			setIsTableUpdating(false);
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
