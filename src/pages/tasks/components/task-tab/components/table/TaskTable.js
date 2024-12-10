import React from "react";
import { Table, Tag, Typography } from "antd";
import { Styled } from "./TaskTable.styles";

const { Title } = Typography;

function TasksTable({ tasks, loading, handleViewClick }) {
	const columns = [
		{ title: "Task", dataIndex: "task_name", key: "task", width: "70%" },
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => <StatusTag status={status} />,
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
			/>
		</Styled.Container>
	);
}

export default TasksTable;

const StatusTag = ({ status }) => {
	let color = "default";

	switch (status) {
		case "To Do":
			color = null;
			break;
		case "In Progress":
			color = "blue";
			break;
		case "Done":
			color = "green";
			break;
		case "Block":
			color = "red";
			break;
		default:
			color = "default";
	}

	return <Tag color={color}>{status}</Tag>;
};
