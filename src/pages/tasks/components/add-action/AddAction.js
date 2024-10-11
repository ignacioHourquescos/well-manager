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
	Space,
	Empty,
} from "antd";
import { Styled } from "./AddAction.styles";
import FormItem from "../../../../components/common/FormItem";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Title } = Typography;

function AddAction({
	initialValues,
	entityComments,
	selectedTask,
	performance,
}) {
	const [componentVariant, setComponentVariant] = useState("filled");
	const [form] = Form.useForm();
	const [newTask, setNewTask] = useState(false);
	const formValues = Form.useWatch([], form);
	const onFinish = (values) => {
		console.log(values);
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [initialValues, form]);

	const calculateRows = useMemo(() => {
		if (!formValues?.notes) return 1;
		const lineBreaks = (formValues.notes.match(/\n/g) || []).length;
		const estimatedRows = Math.ceil(
			(formValues.notes.length + lineBreaks) / 50
		);
		return Math.min(Math.max(estimatedRows, 1), 4); // Minimum 1 row, maximum 4 rows
	}, [formValues?.notes]);

	const onCreateNew = () => {
		console.log("onCreateNew");
		setNewTask(true);
	};

	if (!selectedTask && !newTask) {
		return (
			<Styled.Container>
				<Empty
					description={
						<span>
							<Title
								level={5}
								style={{
									color: "#1890ff",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
								onClick={onCreateNew}
							>
								<PlusOutlined style={{ marginRight: "8px" }} />
								{performance !== "Optimal"
									? "Crear nueva tarea"
									: "Agregar Comentario"}
							</Title>
							Seleccione una tarea existente o cree una nueva para comenzar.
						</span>
					}
				/>
			</Styled.Container>
		);
	}

	return (
		<Styled.Container>
			<br />
			<Form onFinish={onFinish} initialValues={initialValues} form={form}>
				{performance !== "Optimal" && (
					<>
						<Row>
							<Col span={24}>
								<FormItem
									label="Tarea"
									name="task"
									width="100%"
									value={formValues?.task}
									inputComponent={<Select allowClear options={task_options} />}
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
									inputComponent={
										<Select allowClear options={status_options} />
									}
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
				)}

				<Title level={5}>Comentarios</Title>
				<br />
				{!newTask && (
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
							return shuffleArray([...entityComments]).slice(0, randomLength);
						})()}
					/>
				)}
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

export default AddAction;

const task_options = [
	{
		value: "mantenimiento_filtros",
		label: "Mantenimiento de Filtros de Superficie",
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
