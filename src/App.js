import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutGeneral from "./components/layout/LayoutGeneral";
import Home from "./pages/home/Home";
import { TbArrowLeft } from "react-icons/tb";
import Well from "./pages/well/Well";
import ActionPlan from "./pages/action-plan/ActionPlan";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<LayoutGeneral />}>
					<Route path="/" element={<Home />} />
					<Route path="/well/:pozoCode" element={<Well />} />
					<Route path="/action-plan" element={<ActionPlan />} />

					{/* Add other routes as needed */}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
