import { Typography, Layout, Row, Col, Table, Modal, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_actions } from "../../services/general";
import LayoutPage from "../../components/layout/components/main/LayoutPage";
import { useParams, useLocation } from "react-router-dom";
import AddAction from "./components/add-action/AddAction";
import PageActions from "./components/page-actions/PageActions";

import TasksTable from "./components/table/TaskTable";

const { Title } = Typography;

function Tasks() {
	const { entityId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [performance, setPerformance] = useState("");
	const location = useLocation();
	const [actionPlan, setActionPlan] = useState("");
	const [selectedTask, setSelectedTask] = useState(null);

	const openModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		// Add logic to update performance or action plan
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

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

	useEffect(() => {
		const queryString = location.search;
		const queryWithoutQuestionMark = queryString.substring(1);
		const queryParts = queryWithoutQuestionMark.split("?");

		// Set the first part to performance
		if (queryParts.length > 0) {
			setPerformance(queryParts[0]);
		}

		// The second part (if exists) is the issue
		if (queryParts.length > 1) {
			setActionPlan(decodeURIComponent(queryParts[1]));
		}
	}, [location]);

	const handleViewClick = (id) => {
		setSelectedTask(id);
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
		<LayoutPage
			pageName={`${entityId}`}
			pageActions={
				<PageActions
					performance={performance}
					actionPlan={actionPlan}
					showPerformanceModificationModal={openModal}
				/>
			}
		>
			<Modal
				title="Change Performance"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>
					FORMUALRIO PARA CAMBIAR DE PERFORMANCE Y ACTION PLAN CON TODAS LAS
					VALIDACIONES NECESARIOS A DEFINIR
				</p>
				{/* Add your form or other content here */}
			</Modal>
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
					/>
				</Col>
			</Row>
		</LayoutPage>
	);
}

export default Tasks;

const entity_comments = [
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>Carlos Rodríguez</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Observado disminución en la tasa de producción del pozo #3.
				</p>
				<h7 style={{ margin: 0, padding: 0 }}>2023-05-18 14:30</h7>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>Ana María Gómez</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Realizada prueba de presión de rutina en el pozo #7. Resultados
					normales.
				</p>
				<h7 style={{ margin: 0, padding: 0 }}>2023-05-20 09:15</h7>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>Javier Fernández</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Iniciado trabajo de reacondicionamiento para reemplazar la bomba de
					fondo en el pozo #5.
				</p>
				<h7 style={{ margin: 0, padding: 0 }}>2023-05-25 11:45</h7>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>Elena Martínez</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Completado tratamiento de acidificación para mejorar la permeabilidad
					del pozo #2.
				</p>
				<h7 style={{ margin: 0, padding: 0 }}>2023-06-02 16:20</h7>
			</>
		),
	},
	{
		color: "gray",
		children: (
			<>
				<h4 style={{ margin: 0, padding: 0 }}>Ricardo Sánchez</h4>
				<p style={{ margin: 0, padding: 0 }}>
					Ajustado el tamaño del estrangulador para optimizar la tasa de flujo
					del pozo #9.
				</p>
				<h7 style={{ margin: 0, padding: 0 }}>2023-06-10 13:05</h7>
			</>
		),
	},
];
