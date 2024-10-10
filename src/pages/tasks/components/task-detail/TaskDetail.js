import React, { useEffect } from "react";
import { Card, Spin, Typography } from "antd";

const { Text } = Typography;
function TaskDetail({ selectedTask }) {
	return (
		<Card title="Task Details" bordered={false}>
			<p>
				<Text strong>Task:</Text> {selectedTask?.task}
			</p>
			<p>
				<Text strong>Start Date:</Text> {selectedTask?.dateStart}
			</p>
			<p>
				<Text strong>Finish Date:</Text> {selectedTask?.dateFinish}
			</p>
			<p>
				<Text strong>Status:</Text> {selectedTask?.status}
			</p>
			<p>
				<Text strong>Notify:</Text> {selectedTask?.notify}
			</p>
		</Card>
	);
}

export default TaskDetail;
