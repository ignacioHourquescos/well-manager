import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import your page components
import Home from "../pages/home/Home";
import Tasks from "../pages/tasks/Tasks";
// Import other pages as needed

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route path="/tasks/:id" element={<Tasks />} />
				{/* Add other routes as needed */}
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
