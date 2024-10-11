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
						tasks={performance === "Optimal" ? null : tasks}
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
