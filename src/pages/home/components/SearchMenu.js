import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Select, Button } from "antd";
import { Inner } from "./SearchMenu.styles";
import FormItem from "../../../components/common/FormItem";
import {
	fetch_performance,
	fetch_action_plan,
} from "../../../services/general";

const { Option } = Select;
const SearchMenu = ({ onFilter }) => {
	const [form] = Form.useForm();
	const [performanceOptions, setPerformanceOptions] = useState([]);
	const [actionPlanOptions, setActionPlanOptions] = useState([]);
	const formValues = Form.useWatch([], form);

	console.log("PERFORMANCE");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [performanceData, actionPlanData] = await Promise.all([
					fetch_performance(),
					fetch_action_plan(),
				]);
				// Transform the performance data to match Select's expected format
				const formattedPerformanceOptions = performanceData.map((item) => ({
					value: item.code.toLowerCase(),
					label: item.name,
				}));
				const formattedActionPlanOptions = actionPlanData.map((item) => ({
					...item,
					value: item.name, // Use name instead of code as value
					label: item.name,
				}));
				setPerformanceOptions(formattedPerformanceOptions);
				setActionPlanOptions(formattedActionPlanOptions);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const onFinish = (values) => {
		console.log(values);
		onFilter(values);
	};

	return (
		<Inner>
			<br />
			<Form onFinish={onFinish} form={form}>
				<Row>
					<Col span={24}>
						<FormItem
							label="Entidad"
							name="code"
							width="100%"
							value={formValues?.code}
							inputComponent={<Input />}
						/>
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<FormItem
							label="Performance"
							name="performance"
							width="100%"
							value={formValues?.performance}
							inputComponent={
								<Select allowClear options={performanceOptions}></Select>
							}
						/>
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<FormItem
							label="Action Plan"
							name="action_plan"
							width="100%"
							value={formValues?.action_plan}
							inputComponent={
								<Select allowClear options={actionPlanOptions}></Select>
							}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col span={24}>
						<Button
							color="primary"
							style={{ width: "100%" }}
							variant="outlined"
							htmlType="submit"
						>
							Buscar
						</Button>
					</Col>
				</Row>
			</Form>
		</Inner>
	);
};

export default SearchMenu;
const performance_options = [
	{
		value: "outstanding",
		label: "Outstanding",
	},
	{
		value: "average",
		label: "Average",
	},
	{
		value: "recoverable production",
		label: "Recoverable Production",
	},
	{
		value: "enhance production",
		label: "Enhance Production",
	},
	{
		value: "unrecoverable production",
		label: "Unrecoverable Production",
	},
];

const action_plan_options = [
	{
		value: "adjust potential",
		label: "Adjust potential",
	},
	{
		value: "improve fluid allocation",
		label: "Improve Fluid Allocation",
	},
	{
		value: "solve facilities constrains",
		label: "Solve Facilities Constrains",
	},
	{
		value: "inactive well shut in",
		label: "Inactive Well/Shut in",
	},
	{
		value: "adjust surface operational parameters",
		label: "Adjust surface operational parameters",
	},
	{
		value: "update operational parameters",
		label: "Update operational parameters",
	},
	{
		value: "normal monitoring",
		label: "Normal Monitoring",
	},
	{
		value: "return to production injection",
		label: "Return to production/injection",
	},
	{
		value: "improve enhanced recovery",
		label: "Improve Enhanced Recovery",
	},
	{
		value: "reduce lack of capacity",
		label: "Reduce lack of capacity",
	},
	{
		value: "improve reservoir performance",
		label: "Improve reservoir performance",
	},
	{
		value: "adjust inflow outflow performance",
		label: "Adjust Inflow/Outflow performance",
	},
	{
		value: "further studies",
		label: "Further Studies",
	},
	{
		value: "out of scan",
		label: "Out of Scan",
	},
];
