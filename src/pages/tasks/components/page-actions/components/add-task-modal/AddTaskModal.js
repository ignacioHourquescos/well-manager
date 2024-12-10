import React, { useState, useMemo, useEffect } from "react";
import {
	Modal,
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	message,
	Row,
	Col,
} from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import FormItem from "../../../../../../components/common/FormItem";
import { fetch_task_descriptions_by_action_plan } from "../../../../../../services/general";

const { TextArea } = Input;

const AddTaskModal = ({ open, onClose, onSubmit }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const formValues = Form.useWatch([], form);
	const [taskOptions, setTaskOptions] = useState([]);
	const [searchParams] = useSearchParams();
	const actionPlanId = searchParams.get("action_plan_id");

	// Add this useEffect to fetch task descriptions when modal opens
	useEffect(() => {
		const fetchTaskDescriptions = async () => {
			try {
				const data = await fetch_task_descriptions_by_action_plan(
					parseInt(actionPlanId)
				);

				// Transform the data into options format for Select
				const options = data.map((task) => ({
					value: task.task_id,
					label: `${task.task_id} - ${task.task_description}`,
				}));

				setTaskOptions(options);
			} catch (error) {
				console.error("Error fetching task descriptions:", error);
				message.error("Failed to load task descriptions");
			}
		};

		if (open && actionPlanId) {
			fetchTaskDescriptions();
		}
	}, [open, actionPlanId]);

	// Calculate rows for TextArea
	const calculateRows = useMemo(() => {
		if (!formValues?.additional_comments) return 1;
		const lineBreaks = (formValues.additional_comments.match(/\n/g) || [])
			.length;
		const estimatedRows = Math.ceil(
			(formValues.additional_comments.length + lineBreaks) / 50
		);
		return Math.min(Math.max(estimatedRows, 1), 4);
	}, [formValues?.additional_comments]);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			await onSubmit(values);
			form.resetFields();
			onClose();
		} catch (error) {
			console.error("Error submitting task:", error);
			message.error(error.message || "Failed to submit task");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Add New Task"
			open={open}
			onCancel={onClose}
			footer={[
				<Button key="cancel" onClick={onClose}>
					Cancel
				</Button>,
				<Button
					key="submit"
					type="primary"
					loading={loading}
					onClick={handleSubmit}
				>
					Add Task
				</Button>,
			]}
		>
			<Form form={form} layout="vertical" name="addTaskForm">
				<Row>
					<Col span={24}>
						<FormItem
							label="Task"
							name="task_id"
							rules={[{ required: true, message: "Please select a task!" }]}
							value={formValues?.task_id}
							inputComponent={
								<Select options={taskOptions} loading={!taskOptions.length} />
							}
						/>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<FormItem
							label="Responsible"
							name="responsable"
							rules={[
								{
									required: true,
									message: "Please input the responsible person!",
								},
								{ max: 50, message: "Maximum 50 characters" },
							]}
							value={formValues?.responsable}
							inputComponent={<Input />}
						/>
					</Col>

					<Col span={12}>
						<FormItem
							label="Priority"
							name="priority"
							rules={[
								{ required: true, message: "Please select the priority!" },
							]}
							value={formValues?.priority}
							inputComponent={<Select options={priority_options} />}
						/>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<FormItem
							label="Start Date"
							name="start_date"
							rules={[
								{ required: true, message: "Please select the start date!" },
							]}
							value={formValues?.start_date}
							inputComponent={
								<DatePicker
									format="DD/MM/YYYY"
									style={{ width: "100%" }}
									placeholder=""
								/>
							}
						/>
					</Col>

					<Col span={12}>
						<FormItem
							label="Due Date"
							name="due_date"
							rules={[
								{ required: true, message: "Please select the due date!" },
							]}
							value={formValues?.due_date}
							inputComponent={
								<DatePicker
									format="DD/MM/YYYY"
									style={{ width: "100%" }}
									placeholder=""
								/>
							}
						/>
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<FormItem
							label="Additional Comments"
							name="additional_comments"
							value={formValues?.additional_comments}
							rules={[{ max: 500, message: "Maximum 500 characters" }]}
							inputComponent={
								<TextArea
									rows={calculateRows}
									autoSize={{ minRows: 1, maxRows: 4 }}
								/>
							}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default AddTaskModal;

const priority_options = [
	{
		value: "ALTA",
		label: "High",
	},
	{
		value: "MEDIA",
		label: "Medium",
	},
	{
		value: "BAJA",
		label: "Low",
	},
];
