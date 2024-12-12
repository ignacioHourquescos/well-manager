import React, { useState, useEffect } from "react";
import { Table, Tag, Drawer } from "antd";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import { fetch_personal_tasks } from "../../services/general";
import dayjs from "dayjs";
import TaskDetail from "../tasks/components/task-tab/components/task-detail/TaskDetail";

function PersonalTasks() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedTask, setSelectedTask] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const loadTasks = async () => {
		try {
			setLoading(true);
			const data = await fetch_personal_tasks("Juan Perez");
			console.log("Marcelino"); // Replace with actual user name
			setTasks(data);
		} catch (error) {
			console.error("Error loading tasks:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTasks();
	}, []);

	const handleTaskClick = (record) => {
		setSelectedTask(record);
		setDrawerVisible(true);
	};

	const columns = [
		{
			title: "Task",
			dataIndex: "task_name",
			key: "task_name",
			render: (text, record) => (
				<a onClick={() => handleTaskClick(record)}>{text}</a>
			),
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				const statusOption = status_options.find(
					(option) => option.value === status?.toLowerCase()
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
			title: "Start Date",
			dataIndex: "start_date",
			key: "start_date",
			render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
		},
		{
			title: "Due Date",
			dataIndex: "due_date",
			key: "due_date",
			render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
		},
		{
			title: "Well Code",
			dataIndex: "well_code",
			key: "well_code",
		},
		{
			title: "Well Type",
			dataIndex: "well_type",
			key: "well_type",
		},
		{
			title: "Project",
			dataIndex: "well_project",
			key: "well_project",
		},
		{
			title: "Destination Plant",
			dataIndex: "well_destination_plant",
			key: "well_destination_plant",
		},
	];

	return (
		<LayoutPage
			pageName="My Tasks"
			secondaryTitle="Personal Task List"
			type="standard-layout"
		>
			<Table
				loading={loading}
				dataSource={tasks}
				columns={columns}
				pagination={{ pageSize: 11 }}
				size="middle"
				rowKey="id"
			/>

			<Drawer
				title="Task Details"
				placement="right"
				width={720}
				onClose={() => setDrawerVisible(false)}
				open={drawerVisible}
			>
				<TaskDetail
					taskDetails={selectedTask}
					loading={false}
					onSuccess={() => {
						setDrawerVisible(false);
						// Refresh the tasks list
						loadTasks();
					}}
				/>
			</Drawer>
		</LayoutPage>
	);
}

// Reusing the StatusTag component and status_options from TaskTable
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

const status_options = [
	{ value: "pending", label: "Pending" },
	{ value: "in_progress", label: "In Progress" },
	{ value: "done", label: "Done" },
	{ value: "canceled", label: "Canceled" },
	{ value: "failed", label: "Failed" },
	{ value: "stand_by", label: "Stand By" },
];

export default PersonalTasks;
