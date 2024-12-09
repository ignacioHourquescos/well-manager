import { Typography, Layout, Row, Col, message, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import AddAction from "./components/add-action/AddAction";
import PageActions from "./components/page-actions/PageActions";
import TasksTable from "./components/table/TaskTable";
import History from "./components/history/History";
import ChangePerformanceModal from "./components/change-performance-modal/ChangePerformanceModal";

import {
	fetch_tasks,
	fetch_action_plan,
	update_well_performance,
	fetch_work_order_tasks,
} from "../../services/general";
import AddTaskModal from "./components/page-actions/components/add-task-modal/AddTaskModal";

function Tasks() {
	const { wellId, wellCode, workOrderId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [performance, setPerformance] = useState("");
	const [actionPlan, setActionPlan] = useState("");
	const [selectedTask, setSelectedTask] = useState(null);
	const [activeTab, setActiveTab] = useState("1");
	const [error, setError] = useState(null);
	const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

	const handleTabChange = (key) => {
		setActiveTab(key);
	};

	const openModal = () => {
		setIsModalVisible(true);
	};

	const handleStatusUpdate = async (values) => {
		try {
			await update_well_performance(
				parseInt(wellId),
				parseInt(values.performance),
				parseInt(values.action_plan)
			);

			setPerformance(values.performance);
			setActionPlan(values.action_plan);
			setIsModalVisible(false);
			message.success("Well status updated successfully");
		} catch (error) {
			console.error("Failed to update well status:", error);
			message.error("Failed to update well status");
		}
	};

	const handleViewClick = (taskId) => {
		const selectedTaskData = tasks.find((task) => task.task_id === taskId);
		setSelectedTask(selectedTaskData);
	};
	useEffect(() => {
		async function loadWorkOrderTasks() {
			try {
				setLoading(true);
				const data = await fetch_work_order_tasks(workOrderId);
				setTasks(data);
			} catch (err) {
				console.error("Error fetching work order tasks:", err);
				setError("Failed to fetch work order tasks");
				message.error("Failed to load tasks");
			} finally {
				setLoading(false);
			}
		}

		if (workOrderId) {
			loadWorkOrderTasks();
		}
	}, [workOrderId]);

	const items = [
		{
			key: "1",
			label: "Tareas",
			children: null,
		},
		{
			key: "2",
			label: "Historial",
			children: <History />,
		},
		{
			key: "3",
			label: "Tab adicional",
		},
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "1":
				return (
					<Row gutter={24}>
						<Col span={12}>
							<TasksTable
								tasks={tasks}
								loading={loading}
								handleViewClick={handleViewClick}
							/>
						</Col>
						<Col span={12}>
							<AddAction
								initialValues={selectedTask}
								entityComments={entity_comments}
								selectedTask={selectedTask}
								performance={performance}
							/>
						</Col>
					</Row>
				);
			case "2":
				return <div>Grafico con el hisotrial del pozo</div>;
			case "3":
				return <div></div>;
			default:
				return null;
		}
	};

	const handleAddTask = async (values) => {
		try {
			const payload = {
				id_work_order: parseInt(workOrderId),
				task_id: parseInt(values.task_id),
				responsable: values.responsable,
				priority: values.priority,
				status: values.status,
				start_date: values.start_date.toISOString(),
				due_date: values.due_date.toISOString(),
				additional_comments: values.additional_comments,
			};

			// ... your API call code ...
			setIsAddTaskModalVisible(false);
			message.success("Task added successfully");
		} catch (error) {
			console.error("Error adding task:", error);
			message.error("Failed to add task");
		}
	};

	const fetchTasks = async () => {
		try {
			setLoading(true);
			const data = await fetch_work_order_tasks(workOrderId);
			setTasks(data);
		} catch (err) {
			console.error("Error fetching work order tasks:", err);
			setError("Failed to fetch work order tasks");
			message.error("Failed to load tasks");
		} finally {
			setLoading(false);
		}
	};

	const handleTaskCreated = () => {
		fetchTasks();
	};

	return (
		<LayoutPage pageName={`${wellCode}`}>
			<PageActions
				entityId={wellCode}
				performance={performance}
				actionPlan={actionPlan}
				showPerformanceModificationModal={openModal}
				showAddTaskModal={setIsAddTaskModalVisible}
			/>

			<Tabs
				defaultActiveKey="1"
				items={items}
				style={{ padding: "0rem" }}
				onChange={handleTabChange}
			/>

			{renderTabContent()}

			<ChangePerformanceModal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onOk={handleStatusUpdate}
				initialPerformance={performance}
				initialActionPlan={actionPlan}
			/>
			<AddTaskModal
				open={isAddTaskModalVisible}
				onClose={() => setIsAddTaskModalVisible(false)}
				onSuccess={handleTaskCreated}
			/>
		</LayoutPage>
	);
}

export default Tasks;

const entity_comments = [
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>
					Carlos Rodríguez{" "}
					<span style={{ fontWeight: "normal" }}>(2023-05-18 14:30)</span>
				</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Observado disminución en la tasa de producción del pozo #3.
				</p>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>
					Ana María Gómez{" "}
					<span style={{ fontWeight: "normal" }}>(2023-05-20 09:15)</span>
				</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Realizada prueba de presión de rutina en el pozo #7. Resultados
					normales.
				</p>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>
					Javier Fernández{" "}
					<span style={{ fontWeight: "normal" }}>(2023-05-25 11:45)</span>
				</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Iniciado trabajo de reacondicionamiento para reemplazar la bomba de
					fondo en el pozo #5.
				</p>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>
					Elena Martínez{" "}
					<span style={{ fontWeight: "normal" }}>(2023-06-02 16:20)</span>
				</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Completado tratamiento de acidificación para mejorar la permeabilidad
					del pozo #2.
				</p>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>
					Ricardo Sánchez{" "}
					<span style={{ fontWeight: "normal" }}>(2023-06-10 13:05)</span>
				</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Ajustado el tamaño del estrangulador para optimizar la tasa de flujo
					del pozo #9.
				</p>
			</>
		),
	},
];
