import React, { useEffect, useState, useMemo } from "react";
import {
	Form,
	Input,
	DatePicker,
	Button,
	Select,
	Row,
	Col,
	Empty,
	Spin,
	message,
	Typography,
	Timeline,
} from "antd";
import { Styled } from "./TaskDetail.styles";
import FormItem from "../../../../../../components/common/FormItem";
import dayjs from "dayjs";
import {
	update_task,
	fetch_task_statuses,
} from "../../../../../../services/general";
import { GiConsoleController } from "react-icons/gi";

const { TextArea } = Input;
const { Title } = Typography;

// Add the responsible options (you can move this to a shared constants file if needed)
const responsible_options = [
	{
		value: "Juan Perez",
		label: "Juan Perez",
	},
	{
		value: "Francisco Paz",
		label: "Francisco Paz",
	},
	{
		value: "Jorge Fernandez",
		label: "Jorge Fernandez",
	},
	{
		value: "Maria Gomez",
		label: "Maria Gomez",
	},
	{
		value: "Silvia Perez",
		label: "Silvia Perez",
	},
];

function TaskDetail({ initialValues, taskDetails, loading, onSuccess }) {
	const [form] = Form.useForm();
	const [isUpdating, setIsUpdating] = useState(false);
	const formValues = Form.useWatch([], form);
	const [statusOptions, setStatusOptions] = useState([]);

	useEffect(() => {
		if (taskDetails) {
			form.setFieldsValue({
				task_id: taskDetails.task_id,
				task: taskDetails.task_name,
				responsable: taskDetails.responsable,
				priority: taskDetails.priority,
				status: taskDetails.status?.toLowerCase() || "todo",
				startDate: taskDetails.start_date
					? dayjs(taskDetails.start_date)
					: undefined,
				dueDate: taskDetails.due_date ? dayjs(taskDetails.due_date) : undefined,
				notes: taskDetails.additional_comments,
			});
		} else if (initialValues) {
			form.setFieldsValue(initialValues);
		}
	}, [taskDetails, initialValues, form]);

	useEffect(() => {
		const getStatusOptions = async () => {
			try {
				const statuses = await fetch_task_statuses();
				const formattedOptions = statuses.map((status) => ({
					value: status.code,
					label: status.label,
				}));
				setStatusOptions(formattedOptions);
			} catch (error) {
				console.error("Failed to fetch task statuses:", error);
			}
		};

		getStatusOptions();
	}, []);

	//CALCULA LA CANIDAD DE FILAS PARA NOTAS
	const calculateRows = useMemo(() => {
		if (!formValues?.notes) return 1;
		const lineBreaks = (formValues.notes.match(/\n/g) || []).length;
		const estimatedRows = Math.ceil(
			(formValues.notes.length + lineBreaks) / 50
		);
		return Math.min(Math.max(estimatedRows, 1), 4); // Minimum 1 row, maximum 4 rows
	}, [formValues?.notes]);

	const handleSubmit = async (values) => {
		try {
			if (!values.task) {
				message.error("Task is required");
				return;
			}

			setIsUpdating(true);

			const taskData = {
				id: taskDetails.id,
				id_work_order: taskDetails.id_work_order,
				task_id: parseInt(taskDetails.task_id),
				responsable: values.responsable || "",
				priority: values.priority || "",
				status: values.status || "pending",
				start_date: values.startDate ? values.startDate.toISOString() : null,
				due_date: values.dueDate ? values.dueDate.toISOString() : null,
				additional_comments: values.notes || "",
			};

			await update_task(taskData);
			message.success("Task updated successfully");

			if (typeof onSuccess === "function") {
				onSuccess();
			}
		} catch (error) {
			console.error("Error updating task:", error);
			message.error(
				"Failed to update task: " + (error.message || "Unknown error")
			);
		} finally {
			setIsUpdating(false);
		}
	};

	if (loading) {
		return <Spin />;
	}

	if (!taskDetails) {
		return <Empty description="Select a task to view details" />;
	}

	return (
		<Styled.Container>
			<br />
			<Form onFinish={handleSubmit} initialValues={initialValues} form={form}>
				<>
					<Row>
						<Col span={24}>
							<FormItem
								label="Tarea"
								name="task"
								width="100%"
								value={formValues?.task}
								inputComponent={
									<Select allowClear options={task_options} disabled={true} />
								}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}>
							<FormItem
								label="Responsable"
								name="responsable"
								value={formValues?.responsable}
								inputComponent={
									<Select
										options={responsible_options}
										placeholder="Select responsible person"
										style={{ width: "100%" }}
									/>
								}
							/>
						</Col>
						<Col span={8}>
							<FormItem
								label="Prioridad"
								name="priority"
								width="100%"
								value={formValues?.priority}
								inputComponent={
									<Select allowClear options={priority_options} />
								}
							/>
						</Col>
						<Col span={8}>
							<FormItem
								label="Status"
								name="status"
								width="100%"
								value={formValues?.status}
								inputComponent={<Select allowClear options={statusOptions} />}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}>
							<FormItem
								label="Start Date"
								name="startDate"
								value={formValues?.startDate}
								inputComponent={
									<DatePicker format="DD/MM/YYYY" allowClear placeholder="" />
								}
							/>
						</Col>
						<Col span={8}>
							<FormItem
								label="Due Date "
								name="dueDate"
								width="100%"
								value={formValues?.dueDate}
								inputComponent={
									<DatePicker format="DD/MM/YYYY" allowClear placeholder="" />
								}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<FormItem
								label="Notas adicionales"
								name="notes"
								value={formValues?.notes}
								rules={[{ max: 50, message: "Máximo 50 caracteres" }]}
								inputComponent={
									<TextArea
										rows={calculateRows}
										autoSize={{ minRows: 1, maxRows: 4 }}
									/>
								}
							/>
						</Col>
					</Row>
				</>

				<Title level={5}>Comentarios</Title>
				<br />
				<Timeline
					items={(() => {
						// Original comments array

						// Function to shuffle array
						const shuffleArray = (array) => {
							for (let i = array.length - 1; i > 0; i--) {
								const j = Math.floor(Math.random() * (i + 1));
								[array[i], array[j]] = [array[j], array[i]];
							}
							return array;
						};

						// Get random length between 1 and the original array length
						const randomLength =
							Math.floor(Math.random() * entityComments.length) + 1;

						// Shuffle and slice the array
						return entityComments;
					})()}
				/>

				<Form.Item style={{ position: "absolute", right: 0 }}>
					<Styled.ButtonContainer>
						<Row gutter={12}>
							<Button
								color="primary"
								variant="outlined"
								htmlType="submit"
								loading={isUpdating}
								disabled={isUpdating}
							>
								{isUpdating ? "Guardando..." : "Guardar Tarea"}
							</Button>
						</Row>
					</Styled.ButtonContainer>
				</Form.Item>
			</Form>
			{isUpdating && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: "rgb(250, 250, 250, 0.7)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1000,
					}}
				>
					<Spin size="large" tip="Actualizando tarea..." />
				</div>
			)}
		</Styled.Container>
	);
}

export default TaskDetail;

const task_options = [
	{
		value: 14,
		label: "Schedule Well Intervention",
	},
	{
		value: "mejorar_instalaciones",
		label: "Mejorar/Reparar Instalaciones de Inyección",
	},
	{
		value: "estimacion_costos",
		label: "Estimación de Costos y Riesgo",
	},
	{
		value: "revision_historia",
		label: "Revisión de Historia de Inyección",
	},
	{
		value: "regulacion_superficie",
		label: "Regulación de Superficie",
	},
	{
		value: "prueba_presion",
		label: "Prueba de Presión de Reservorio",
	},
	{
		value: "calibracion_instalacion",
		label: "Calibración de Instalación",
	},
];

const priority_options = [
	{
		value: "high",
		label: "High",
	},
	{
		value: "medium",
		label: "Medium",
	},
	{
		value: "low",
		label: "Low",
	},
];

const entityComments = [
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
