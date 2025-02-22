import React from "react";
import { Row, Col, Statistic } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

const WellDetailTab = ({ currentWellData }) => {
	return (
		<div>
			<Row gutter={16}>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Description"
						value={currentWellData.description || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Type"
						value={currentWellData.type || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Code"
						value={currentWellData.code || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Ignore"
						value={currentWellData.ignore || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Destination Batch"
						value={currentWellData.dest_batt || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Method of Production"
						value={currentWellData.method_production || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Drilling Type"
						value={currentWellData.drilling_type || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Reservoir Type"
						value={currentWellData.reservoir_type || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Depth (m)"
						value={currentWellData.depth_mts || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Destination Plant"
						value={currentWellData.dest_plant || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Destination Site"
						value={currentWellData.dest_sit || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="WF Project"
						value={currentWellData.wf_project || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>

				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Created At"
						value={currentWellData.created_at || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
				<Col span={8} style={{ marginBottom: 16 }}>
					<Statistic
						title="Well Type"
						value={currentWellData.well_type || "-"}
						valueRender={(value) => <Title level={5}>{value}</Title>}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default WellDetailTab;
