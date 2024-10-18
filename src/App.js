import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LayoutGeneral from "./components/layout/LayoutGeneral";
import Home from "./pages/home/Home";
import Well from "./pages/well/Well";
import Tasks from "./pages/tasks/Tasks";
import PersonalTasks from "./pages/personal-tasks/PersonalTasks";
import { useDebugMode } from "./hooks/useDebugMode";

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route element={<LayoutGeneral />}>
					<Route path="/" element={<Home />} />
					<Route path="/entity/:entityId" element={<Well />} />
					<Route path="/tasks/:entityId" element={<Tasks />} />
					<Route path="/my-tasks" element={<PersonalTasks />} />
					{/* Add other routes as needed */}
				</Route>
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	useDebugMode();
	return (
		<Router>
			<AnimatedRoutes />
		</Router>
	);
}

export default App;
