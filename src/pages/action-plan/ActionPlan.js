import { Typography, Layout } from "antd";
import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../services/general";
import LayoutPage from "../../components/layout/components/main/LayoutPage";

const { Title } = Typography;
const { Content } = Layout;

function ActionPlan() {
	return <LayoutPage pageName="Action Plan">Action plan</LayoutPage>;
}

export default ActionPlan;
