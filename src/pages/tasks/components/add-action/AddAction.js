import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

function AddAction() {
	const handleSubmit = (values) => {
		console.log(values);
		// Add logic to submit the form data
	};

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item
				label="Action Name"
				name="actionName"
				rules={[{ required: true, message: "Please input the action name!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="Description" name="description">
				<Input.TextArea />
			</Form.Item>
			<Form.Item
				label="Start Date"
				name="dateStart"
				rules={[{ required: true, message: "Please select the start date!" }]}
			>
				<DatePicker />
			</Form.Item>
			<Form.Item
				label="Finish Date"
				name="dateFinish"
				rules={[{ required: true, message: "Please select the finish date!" }]}
			>
				<DatePicker />
			</Form.Item>
			<Form.Item
				label="Status"
				name="status"
				rules={[{ required: true, message: "Please select the status!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="Notify" name="notify">
				<Input />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Add Action
				</Button>
			</Form.Item>
		</Form>
	);
}

export default AddAction;
