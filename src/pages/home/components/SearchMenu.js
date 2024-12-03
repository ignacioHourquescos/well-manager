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
								<Select allowClear>
									{performanceOptions.map((option) => (
										<Option key={option.code} value={option.code}>
											{option.name}
										</Option>
									))}
								</Select>
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
								<Select allowClear>
									{actionPlanOptions.map((option) => (
										<Option key={option.code} value={option.code}>
											{option.name}
										</Option>
									))}
								</Select>
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
