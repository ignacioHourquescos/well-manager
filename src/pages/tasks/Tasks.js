import { Row, Col, message, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import PageActions from "./components/page-actions/PageActions";
import ChangePerformanceModal from "./components/change-performance-modal/ChangePerformanceModal";

import {
	update_well_performance,
	fetch_work_order_tasks,
	create_work_order_task,
} from "../../services/general";
import TaskTab from "./components/task-tab/TaskTab";

function Tasks() {
	const { wellId, wellCode, workOrderId } = useParams();
	const navigate = useNavigate();

	const [modalStates, setModalStates] = useState({
		isModalVisible: false,
		isAddTaskModalVisible: false,
	});

	const [taskData, setTaskData] = useState({
		tasks: [],
		selectedTask: null,
		loading: true,
		error: null,
	});

	const [wellState, setWellState] = useState({
		performance: "",
		actionPlan: "",
	});

	const [activeTab, setActiveTab] = useState("1");

	const handleModalVisibility = (modalType, isVisible) => {
		setModalStates((prev) => ({
			...prev,
			[modalType]: isVisible,
		}));
	};

	const handleStatusUpdate = async (values) => {
		try {
			await update_well_performance(
				parseInt(wellId),
				parseInt(values.performance),
				parseInt(values.action_plan)
			);

			setWellState({
				performance: values.performance,
				actionPlan: values.action_plan,
			});

			handleModalVisibility("isModalVisible", false);
			message.success("Well status updated successfully");
			navigate("/");
		} catch (error) {
			console.error("Failed to update well status:", error);
			message.error("Failed to update well status");
		}
	};

	const handleTaskSubmit = async (values) => {
		try {
			setTaskData((prev) => ({ ...prev, loading: true }));
			const taskData = {
				id_work_order: workOrderId,
				task_id: values.task_id,
				responsable: values.responsable,
				priority: values.priority,
				status: "To-do",
				start_date: values.start_date?.toISOString(),
				due_date: values.due_date?.toISOString(),
				additional_comments: values.additional_comments,
			};

			await create_work_order_task(taskData);
			message.success("Task created successfully");
			handleModalVisibility("isAddTaskModalVisible", false);
			await fetchTasks();
		} catch (error) {
			console.error("Error creating task:", error);
			message.error(error.message || "Failed to create task");
		} finally {
			setTaskData((prev) => ({ ...prev, loading: false }));
		}
	};

	const handleViewClick = (taskId) => {
		const selectedTaskData = taskData.tasks.find(
			(task) => task.task_id === taskId
		);
		setTaskData((prev) => ({ ...prev, selectedTask: selectedTaskData }));
	};

	const fetchTasks = async () => {
		try {
			setTaskData((prev) => ({ ...prev, loading: true }));
			const data = await fetch_work_order_tasks(workOrderId);
			console.log("Fresh tasks data:", data);
			setTaskData((prev) => ({
				...prev,
				tasks: data,
				error: null,
			}));
		} catch (err) {
			console.error("Error fetching work order tasks:", err);
			setTaskData((prev) => ({
				...prev,
				error: "Failed to fetch work order tasks",
			}));
			message.error("Failed to load tasks");
		} finally {
			setTaskData((prev) => ({ ...prev, loading: false }));
		}
	};

	useEffect(() => {
		if (workOrderId) {
			fetchTasks();
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
			label: "Detalle",
		},
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "1":
				return (
					<TaskTab
						taskData={{
							...taskData,
							refresh: fetchTasks,
						}}
						handleViewClick={handleViewClick}
						entity_comments={entity_comments}
						wellState={wellState}
					/>
				);
			case "2":
				return <div>Detalle del pozo</div>;
			case "3":
				return <div></div>;
			default:
				return null;
		}
	};

	return (
		<LayoutPage pageName={`${wellCode}`}>
			<PageActions
				entityId={wellCode}
				performance={wellState.performance}
				actionPlan={wellState.actionPlan}
				showPerformanceModificationModal={() =>
					handleModalVisibility("isModalVisible", true)
				}
				onTaskSubmit={handleTaskSubmit}
			/>

			<Tabs
				defaultActiveKey="1"
				items={items}
				style={{ padding: "0rem" }}
				onChange={setActiveTab}
			/>

			{renderTabContent()}

			<ChangePerformanceModal
				visible={modalStates.isModalVisible}
				onCancel={() => handleModalVisibility("isModalVisible", false)}
				onOk={handleStatusUpdate}
				initialPerformance={wellState.performance}
				initialActionPlan={wellState.actionPlan}
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
