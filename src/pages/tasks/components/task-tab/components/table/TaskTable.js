import React, { useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import { Styled } from "./TaskTable.styles";
import { fetch_task_statuses } from "../../../../../../services/general";

const { Title } = Typography;

function TasksTable({ tasks, loading, handleViewClick }) {
	const [statusOptions, setStatusOptions] = useState([]);

	useEffect(() => {
		const getStatusOptions = async () => {
			try {
				const statuses = await fetch_task_statuses();
				setStatusOptions(statuses);
			} catch (error) {
				console.error("Failed to fetch task statuses:", error);
			}
		};

		getStatusOptions();
	}, []);

	const columns = [
		{ title: "Task", dataIndex: "task_name", key: "task", width: "70%" },
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				console.log("Rendering status:", status);
				const statusOption = statusOptions.find(
					(option) => option.code === status?.toLowerCase()
				);
				return (
					<StatusTag
						status={status?.toLowerCase()}
						label={statusOption?.label || status}
					/>
				);
			},
		},
		{
			title: "Tareas",
			dataIndex: "tasks",
			render: (text, record) => (
				<a onClick={() => handleViewClick(record.id)}>Ver</a>
			),
		},
	];

	return (
		<Styled.Container>
			<br />
			<Table
				loading={loading}
				dataSource={tasks}
				columns={columns}
				pagination={{ pageSize: 11 }}
				size="middle"
				height={500}
			/>
		</Styled.Container>
	);
}

export default TasksTable;

const StatusTag = ({ status, label }) => {
	let color = "default";

	switch (status?.toLowerCase()) {
		case "pending":
			color = "orange";
			break;
		case "in_progress":
			color = "blue";
			break;
		case "done":
			color = "green";
			break;
		case "canceled":
			color = "red";
			break;
		case "failed":
			color = "purple";
			break;
		case "stand_by":
			color = "gold";
			break;
		default:
			color = "default";
	}

	return <Tag color={color}>{label}</Tag>;
};
