import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutGeneral from "./components/layout/LayoutGeneral";
import Home from "./pages/home/Home";
import { TbArrowLeft } from "react-icons/tb";
import Well from "./pages/well/Well";
import Tasks from "./pages/tasks/Tasks";
import { useDebugMode } from "./hooks/useDebugMode";

function App() {
	useDebugMode();
	return (
		<Router>
			<Routes>
				<Route element={<LayoutGeneral />}>
					<Route path="/" element={<Home />} />
					<Route path="/entity/:entityId" element={<Well />} />
					<Route path="/tasks/:entityId" element={<Tasks />} />

					{/* Add other routes as needed */}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
