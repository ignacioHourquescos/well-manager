import React, { useEffect, useState, useMemo } from "react";
import {
	Form,
	Input,
	DatePicker,
	Button,
	Select,
	Row,
	Col,
	Timeline,
	Typography,
	Empty,
	Spin,
	message,
} from "antd";
import { Styled } from "./TaskDetail.styles";
import FormItem from "../../../../../../components/common/FormItem";
import dayjs from "dayjs";
import { update_task } from "../../../../../../services/general";
const { TextArea } = Input;
const { Title } = Typography;

function TaskDetail({
	initialValues,
	entityComments,
	selectedTask,
	taskDetails,
	loading,
	performance,
	onSuccess,
}) {
	const [form] = Form.useForm();
	const [newTask, setNewTask] = useState(false);
	const formValues = Form.useWatch([], form);
	const onFinish = (values) => {
		console.log(values);
	};

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
			// Validate required fields before submitting
			if (!values.task) {
				message.error("Task is required");
				return;
			}

			const taskData = {
				id: taskDetails.id,
				id_work_order: taskDetails.id_work_order,
				task_id: parseInt(taskDetails.id), // Make sure task_id is a number and not null
				responsable: values.responsable || "",
				priority: values.priority || "",
				status: values.status || "todo",
				start_date: values.startDate ? values.startDate.toISOString() : null,
				due_date: values.dueDate ? values.dueDate.toISOString() : null,
				additional_comments: values.notes || "",
			};

			console.log("Submitting task data:", taskData); // Debug log

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
								rules={[{ max: 50, message: "Máximo 50 caracteres" }]}
								inputComponent={<Input />}
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
								inputComponent={<Select allowClear options={status_options} />}
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

				{/*<Title level={5}>Comentarios</Title>
				<br /><Timeline
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
						return shuffleArray([...entityComments]).slice(0, randomLength);
					})()}
				/>*/}

				<Form.Item style={{ position: "absolute", right: 0 }}>
					<Styled.ButtonContainer>
						<Row gutter={12}>
							<Button
								color="danger"
								variant="outlined"
								htmlType="submit"
								style={{ marginRight: "20px" }}
							>
								Eliminar Tarea
							</Button>

							<Button color="primary" variant="outlined" htmlType="submit">
								Guardar Tarea
							</Button>
						</Row>
					</Styled.ButtonContainer>
				</Form.Item>
			</Form>
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

const status_options = [
	{
		value: "todo",
		label: "To Do",
	},
	{
		value: "in_progress",
		label: "In Progress",
	},
	{
		value: "done",
		label: "Done",
	},
	{
		value: "blocked",
		label: "Blocked",
	},
];
