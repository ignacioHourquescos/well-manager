import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Space, message } from "antd";

const { TextArea } = Input;

const AddTaskModal = ({ open, onClose, onSuccess }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();

			const taskData = {
				id_work_order: values.id_work_order,
				task_id: values.task_id,
				responsable: values.responsable,
				priority: values.priority,
				status: "TO DO",
				start_date: values.start_date?.toISOString(),
				due_date: values.due_date?.toISOString(),
				additional_comments: values.additional_comments,
			};

			const response = await fetch("http://localhost:4000/work-order-task", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create task");
			}

			message.success("Task created successfully");
			form.resetFields();
			if (onSuccess) onSuccess();
			onClose();
		} catch (error) {
			console.error("Error creating task:", error);
			message.error(error.message || "Failed to create task");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Add New Task"
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			okText="Add Task"
			confirmLoading={loading}
		>
			<Form form={form} layout="vertical" name="addTaskForm">
				<Form.Item
					name="id_work_order"
					label="Work Order ID"
					rules={[
						{ required: true, message: "Please input the work order ID!" },
					]}
				>
					<Input type="number" placeholder="Enter work order ID" />
				</Form.Item>

				<Form.Item
					name="task_id"
					label="Task ID"
					rules={[{ required: true, message: "Please input the task ID!" }]}
				>
					<Input type="number" placeholder="Enter task ID" />
				</Form.Item>

				<Form.Item
					name="responsable"
					label="Responsible"
					rules={[
						{ required: true, message: "Please input the responsible person!" },
					]}
				>
					<Input placeholder="Enter responsible person" />
				</Form.Item>

				<Form.Item
					name="priority"
					label="Priority"
					rules={[{ required: true, message: "Please select the priority!" }]}
				>
					<Select placeholder="Select priority">
						<Select.Option value="BAJA">Low</Select.Option>
						<Select.Option value="MEDIA">Medium</Select.Option>
						<Select.Option value="ALTA">High</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="start_date"
					label="Start Date"
					rules={[{ required: true, message: "Please select the start date!" }]}
				>
					<DatePicker showTime style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item
					name="due_date"
					label="Due Date"
					rules={[{ required: true, message: "Please select the due date!" }]}
				>
					<DatePicker showTime style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item name="additional_comments" label="Additional Comments">
					<TextArea rows={4} placeholder="Enter additional comments" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddTaskModal;
