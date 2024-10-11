import React from "react";
import { Table, Typography } from "antd";
import { Styled } from "./TaskTable.styles";

const { Title } = Typography;

function TasksTable({ tasks, loading, handleViewClick }) {
	const columns = [
		{ title: "Task", dataIndex: "task", key: "task" },

		{ title: "Status", dataIndex: "status", key: "status" },
		{
			title: "Tareas",
			dataIndex: "tasks",
			render: (text, record) => (
				<a onClick={() => handleViewClick(record)}>Ver</a>
			),
		},
	];

	return (
		<Styled.Container>
			<Title level={3}>Listado de Tareas</Title>
			<br />
			<Table
				loading={loading}
				dataSource={tasks}
				columns={columns}
				pagination={false}
				size="middle"
			/>
		</Styled.Container>
	);
}

export default TasksTable;
