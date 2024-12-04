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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [performanceData, actionPlanData] = await Promise.all([
					fetch_performance(),
					fetch_action_plan(),
				]);
				setPerformanceOptions(performanceData);
				setActionPlanOptions(actionPlanData);
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
							name="entity"
							width="100%"
							value={formValues?.entity}
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
								<Select allowClear options={performance_options}></Select>
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
								<Select allowClear options={action_plan_options}></Select>
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
		value: "recoverable_production",
		label: "Recoverable Production",
	},
	{
		value: "enhance_production",
		label: "Enhance Production",
	},
	{
		value: "unrecoverable_production",
		label: "Unrecoverable Production",
	},
];

const action_plan_options = [
	{
		value: "adjust_potential",
		label: "Adjust potential",
	},
	{
		value: "improve_fluid_allocation",
		label: "Improve Fluid Allocation",
	},
	{
		value: "solve_facilities_constrains",
		label: "Solve Facilities Constrains",
	},
	{
		value: "inactive_well_shut_in",
		label: "Inactive Well/Shut in",
	},
	{
		value: "adjust_surface_operational_parameters",
		label: "Adjust surface operational parameters",
	},
	{
		value: "update_operational_parameters",
		label: "Update operational parameters",
	},
	{
		value: "normal_monitoring",
		label: "Normal Monitoring",
	},
	{
		value: "return_to_production_injection",
		label: "Return to production/injection",
	},
	{
		value: "improve_enhanced_recovery",
		label: "Improve Enhanced Recovery",
	},
	{
		value: "reduce_lack_of_capacity",
		label: "Reduce lack of capacity",
	},
	{
		value: "improve_reservoir_performance",
		label: "Improve reservoir performance",
	},
	{
		value: "adjust_inflow_outflow_performance",
		label: "Adjust Inflow/Outflow performance",
	},
	{
		value: "further_studies",
		label: "Further Studies",
	},
	{
		value: "out_of_scan",
		label: "Out of Scan",
	},
];
