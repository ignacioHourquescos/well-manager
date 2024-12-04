import { Typography, Layout, Row, Col, Table, Modal, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { fetch_action_plan } from "../../services/general";
import LayoutPage from "../../components/layout/pages/LayoutPage";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AddAction from "./components/add-action/AddAction";
import PageActions from "./components/page-actions/PageActions";
import { motion } from "framer-motion";

import TasksTable from "./components/table/TaskTable";
import History from "./components/history/History";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { Styled } from "./Tasks.styles";

const { Title } = Typography;

function Tasks() {
	const { wellId, wellCode } = useParams();
	const [tasks, setTasks] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [performance, setPerformance] = useState("");
	const location = useLocation();
	const [actionPlan, setActionPlan] = useState("");
	const [selectedTask, setSelectedTask] = useState(null);
	const [activeTab, setActiveTab] = useState("1");
	const navigate = useNavigate();

	const handleTabChange = (key) => {
		setActiveTab(key);
	};

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
				const data = await fetch_action_plan();
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
				);
			case "2":
				return <div>Grafico con el hisotrial del pozo</div>;
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
				performance={performance}
				actionPlan={actionPlan}
				showPerformanceModificationModal={openModal}
			/>

			<Tabs
				defaultActiveKey="1"
				items={items}
				style={{ padding: "0rem" }}
				onChange={handleTabChange}
			/>

			{renderTabContent()}

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
			</Modal>
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
