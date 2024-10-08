import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout pageName="Home">
							<Home />
						</Layout>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
