import React from "react";
import { Chrono } from "react-chrono";

const items = [
	{
		title: "2019-12-05",
		cardTitle: "Admission Start",
		cardSubtitle: "Admission Open",
	},
	{
		title: "2020-01-21",
		cardTitle: "Start 1st round",
		cardSubtitle: "Open for Fillup",
	},
	{
		title: "2020-02-25",
		cardTitle: "Start 2nd round",
		cardSubtitle: "process",
	},
	{
		title: "2020-03-16",
		cardTitle: "Start 3rd round",
		cardSubtitle: "Done",
	},
	{
		title: "2020-04-19",
		cardTitle: "Start 4th round",
		cardSubtitle: "Done",
	},
	{
		title: "2020-05-23",
		cardTitle: "Complete",
		cardSubtitle: "Done",
	},
];

const History = () => {
	return (
		<div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
			Timeline
		</div>
	);
};

export default History;
