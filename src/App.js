import React, { useState, useEffect } from "react";
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
import SplashScreen from "./components/splash-screen/SplashScreen";
import { FilterProvider } from "./context/FilterContext";

function AnimatedRoutes() {
	const location = useLocation();
	const [showSplash, setShowSplash] = useState(true);
	const handleDismissSplash = () => {
		setShowSplash(false);
	};

	if (showSplash) {
		return <SplashScreen onDismiss={handleDismissSplash} />;
	}

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route element={<LayoutGeneral />}>
					<Route path="/" element={<Home />} />
					<Route path="/entity/:wellCode/:wellId" element={<Well />} />
					<Route
						path="/tasks/:wellCode/:wellId/:workOrderId"
						element={<Tasks />}
					/>
					<Route path="/my-tasks" element={<PersonalTasks />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	useDebugMode();
	return (
		<FilterProvider>
			<Router>
				<AnimatedRoutes />
			</Router>
		</FilterProvider>
	);
}

export default App;
