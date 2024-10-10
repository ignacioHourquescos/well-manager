import { Typography, Layout, Row, Col, Table } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_actions } from "../../services/general";
import LayoutPage from "../../components/layout/components/main/LayoutPage";
import { useParams } from "react-router-dom";
import AddAction from "./components/add-action/AddAction";

import TaskDetail from "./components/task-detail/TaskDetail";

const { Title } = Typography;
const { Content } = Layout;

function Tasks() {
	const { entityId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		async function loadActions() {
			try {
				const data = await fetch_actions();
				setTasks(data);
			} catch (err) {
				setError("Failed to fetch actions");
			} finally {
				setLoading(false);
			}
		}
		loadActions();
	}, []);

	const handleViewClick = (id) => {
		setSelectedTask(id);

		// You can perform additional actions here if needed
	};

	const columns = [
		{ title: "Task", dataIndex: "task", key: "task" },
		{ title: "Start Date", dataIndex: "dateStart", key: "dateStart" },
		{ title: "Finish Date", dataIndex: "dateFinish", key: "dateFinish" },
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
		<LayoutPage pageName={`Tareas - ${entityId}`}>
			<Row gutter={16}>
				<Col span={12}>
					<Table
						loading={loading}
						dataSource={tasks}
						columns={columns}
						size="middle"
					/>
				</Col>
				<Col span={12}>
					<TaskDetail selectedTask={selectedTask} />
					{/* <AddAction /> */}
				</Col>
			</Row>
		</LayoutPage>
	);
}

export default Tasks;
