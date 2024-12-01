import React, { useState } from "react";
import { Modal, Checkbox, Button, Tag, Title } from "antd";
import { Styled } from "./GeneralFilter.styles";
import { useFilters } from "../../../context/FilterContext";

const wellTypeOptions = [
	{ label: "Oil Producer", value: "Oil Producer" },
	{ label: "Disposal", value: "Disposal" },
	{ label: "Gas Producer", value: "Gas producer" },
];

const bateriaOptionsRight = [
	{ label: "Bateria 2", value: "bateria_2" },
	{ label: "Bateria 4", value: "bateria_4" },
	{ label: "Bateria 6", value: "bateria_6" },
	{ label: "Bateria 8", value: "bateria_8" },
	{ label: "Bateria 10", value: "bateria_10" },
	{ label: "Bateria 12", value: "bateria_12" },
];

const destinationOptions = Array.from({ length: 3 }, (_, i) => ({
	label: `Destination ${i + 1}`,
	value: `destination_${i + 1}`,
}));

const projectOptions = [
	{ label: "WFP-001", value: "WFP-001" },
	{ label: "WFP-003", value: "WFP-003" },
	{ label: "WFP-004", value: "WFP-004" },
	{ label: "WFP-005", value: "WFP-005" },
	{ label: "WFP-006", value: "WFP-006" },
	{ label: "WFP-007", value: "WFP-007" },
	{ label: "WFP-008", value: "WFP-008" },
	{ label: "WFP-009", value: "WFP-009" },
	{ label: "WFP-010", value: "WFP-010" },
	{ label: "WFP-011", value: "WFP-011" },
	{ label: "WFP-012", value: "WFP-012" },
];

const GeneralFilter = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedWellTypes, setSelectedWellTypes] = useState([]);
	const [selectedBaterias, setSelectedBaterias] = useState([]);
	const [selectedDestinations, setSelectedDestinations] = useState([]);
	const [selectedProjects, setSelectedProjects] = useState([]);
	const { filters, updateFilters } = useFilters();

	const handleModalOpen = () => {
		setSelectedWellTypes(filters.wellTypes);
		setSelectedBaterias(filters.baterias || []);
		setSelectedDestinations(filters.destinations || []);
		setSelectedProjects(filters.projects || []);
		setIsModalOpen(true);
	};

	const handleSave = () => {
		updateFilters("wellTypes", selectedWellTypes);
		updateFilters("baterias", selectedBaterias);
		updateFilters("destinations", selectedDestinations);
		updateFilters("projects", selectedProjects);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleWellTypeChange = (checkedValues) => {
		setSelectedWellTypes(checkedValues);
	};

	const handleBateriaChange = (checkedValues) => {
		setSelectedBaterias(checkedValues);
	};

	const handleDestinationChange = (checkedValues) => {
		setSelectedDestinations(checkedValues);
	};

	const handleProjectChange = (checkedValues) => {
		setSelectedProjects(checkedValues);
	};

	const handleRemoveFilter = (type, value) => {
		if (type === "wellTypes") {
			const updatedFilters = filters.wellTypes.filter((t) => t !== value);
			updateFilters("wellTypes", updatedFilters);
		} else if (type === "baterias") {
			const updatedFilters = filters.baterias.filter((b) => b !== value);
			updateFilters("baterias", updatedFilters);
		} else if (type === "destinations") {
			const updatedFilters = filters.destinations.filter((d) => d !== value);
			updateFilters("destinations", updatedFilters);
		} else if (type === "projects") {
			const updatedFilters = filters.projects.filter((p) => p !== value);
			updateFilters("projects", updatedFilters);
		}
	};

	return (
		<Styled.Header>
			<Styled.FilterContainer>
				<Styled.AddFilterButton onClick={handleModalOpen}>
					Agregar Filtro
				</Styled.AddFilterButton>

				{filters.wellTypes?.map((wellType) => (
					<Styled.FilterTag
						key={wellType}
						closable
						onClose={() => handleRemoveFilter("wellTypes", wellType)}
					>
						{wellTypeOptions.find((opt) => opt.value === wellType)?.label}
					</Styled.FilterTag>
				))}

				{filters.baterias?.map((bateria) => (
					<Styled.FilterTag
						key={bateria}
						closable
						onClose={() => handleRemoveFilter("baterias", bateria)}
					>
						{bateriaOptionsRight.find((opt) => opt.value === bateria)?.label}
					</Styled.FilterTag>
				))}

				{filters.destinations?.map((destination) => (
					<Styled.FilterTag
						key={destination}
						closable
						onClose={() => handleRemoveFilter("destinations", destination)}
					>
						{destinationOptions.find((opt) => opt.value === destination)?.label}
					</Styled.FilterTag>
				))}

				{filters.projects?.map((project) => (
					<Styled.FilterTag
						key={project}
						closable
						onClose={() => handleRemoveFilter("projects", project)}
					>
						{projectOptions.find((opt) => opt.value === project)?.label}
					</Styled.FilterTag>
				))}

				<Modal
					title="Filtros Generales"
					open={isModalOpen}
					onOk={handleSave}
					onCancel={handleCancel}
					width={1200}
					centered={true}
				>
					<Styled.ModalContent>
						<Styled.FilterColumn>
							<Styled.FilterSection>
								<h4>Tipo de Pozo</h4>
								<Checkbox.Group
									options={wellTypeOptions}
									value={selectedWellTypes}
									onChange={handleWellTypeChange}
									direction="vertical"
								/>
							</Styled.FilterSection>
						</Styled.FilterColumn>

						<Styled.FilterColumn>
							<Styled.FilterSection>
								<h4>Bateria</h4>
								<Styled.BateriaSection>
									<Styled.BateriaColumn>
										<Checkbox.Group
											options={bateriaOptionsRight}
											value={selectedBaterias}
											onChange={handleBateriaChange}
										/>
									</Styled.BateriaColumn>
								</Styled.BateriaSection>
							</Styled.FilterSection>
						</Styled.FilterColumn>

						<Styled.FilterColumn>
							<Styled.FilterSection>
								<h4>Destination Plant</h4>
								<Checkbox.Group
									options={destinationOptions}
									value={selectedDestinations}
									onChange={handleDestinationChange}
								/>
							</Styled.FilterSection>
						</Styled.FilterColumn>

						<Styled.FilterColumn>
							<h4>Project</h4>
							<Checkbox.Group
								options={projectOptions}
								value={selectedProjects}
								onChange={handleProjectChange}
							/>
						</Styled.FilterColumn>
					</Styled.ModalContent>
				</Modal>
			</Styled.FilterContainer>
		</Styled.Header>
	);
};

export default GeneralFilter;
