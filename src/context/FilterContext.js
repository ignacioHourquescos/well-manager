import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const [filters, setFilters] = useState({
		wellTypes: [],
		baterias: [],
		destinations: [],
	});

	const updateFilters = (filterType, values) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: values,
		}));
	};

	return (
		<FilterContext.Provider value={{ filters, updateFilters }}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilters = () => useContext(FilterContext);
