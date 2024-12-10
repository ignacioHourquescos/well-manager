import React, { useState } from "react";
import { Modal, Checkbox, Button, Tag, Title } from "antd";
import { Styled } from "./GeneralFilter.styles";
import { useFilters } from "../../../context/FilterContext";
import { GiOilDrum } from "react-icons/gi";
import { FaHouseFloodWater } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";

const wellTypeOptions = [
	{
		label: (
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<GiOilDrum style={{ fontSize: "1.2em" }} />
				<span>Oil Producer</span>
			</div>
		),
		value: "Oil Producer",
	},
	{
		label: (
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<BsTrash3 style={{ fontSize: "1.2em" }} />
				<span>Disposal</span>
			</div>
		),
		value: "Disposal",
	},
	{
		label: (
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<FaHouseFloodWater style={{ fontSize: "1.2em" }} />
				<span>Water Producer</span>
			</div>
		),
		value: "Water Producer",
	},
	{
		label: (
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<FaHouseFloodWater
					style={{
						fontSize: "1.2em",
						transform: "rotate(180deg)",
					}}
				/>
				<span>Water Injector</span>
			</div>
		),
		value: "Water Injector",
	},
];

const bateriaOptionsRight = [
	{ label: "PF-WM-001", value: "PF-WM-001" },
	{ label: "PF-WM-002", value: "PF-WM-002" },
	{ label: "PF-WM-003", value: "PF-WM-003" },
	{ label: "PF-WM-004", value: "PF-WM-004" },
	{ label: "PF-WM-005", value: "PF-WM-005" },
	{ label: "PF-WM-006", value: "PF-WM-006" },
	{ label: "PF-WM-007", value: "PF-WM-007" },
	{ label: "PF-WM-008", value: "PF-WM-008" },
	{ label: "PF-WM-009", value: "PF-WM-009" },
	{ label: "PF-WM-010", value: "PF-WM-010" },
	{ label: "PF-WM-011", value: "PF-WM-011" },
	{ label: "PF-WM-012", value: "PF-WM-012" },
	{ label: "PF-WM-013", value: "PF-WM-013" },
	{ label: "PF-WM-014", value: "PF-WM-014" },
	{ label: "PF-WM-015", value: "PF-WM-015" },
	{ label: "PF-WM-016", value: "PF-WM-016" },
	{ label: "PF-WM-017", value: "PF-WM-017" },
	{ label: "PF-WM-018", value: "PF-WM-018" },
];

const destinationOptions = [
	{ label: "N/A", value: "N/A" },
	{ label: "OTP-WM-001", value: "OTP-WM-001" },
	{ label: "OTP-WM-002", value: "OTP-WM-002" },
	{ label: "WIP-WM-001", value: "WIP-WM-001" },
	{ label: "WIP-WM-003", value: "WIP-WM-003" },
	{ label: "WIP-WM-004", value: "WIP-WM-004" },
	{ label: "WTP-WM", value: "WTP-WM" },
];

const projectOptions = [
	{ label: "Primary Producer", value: "Primary Producer" },
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

	// Split the options into two arrays for left and right columns
	const halfLength = Math.ceil(bateriaOptionsRight.length / 2);
	const leftColumnOptions = bateriaOptionsRight.slice(0, halfLength);
	const rightColumnOptions = bateriaOptionsRight.slice(halfLength);

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
								<div style={{ paddingBottom: "0.5rem" }}>
									<Checkbox.Group
										options={wellTypeOptions}
										value={selectedWellTypes}
										onChange={handleWellTypeChange}
										direction="vertical"
									/>
								</div>
							</Styled.FilterSection>
						</Styled.FilterColumn>

						{/*<Styled.FilterColumn>
							<Styled.FilterSection>
								<h4>Bateria</h4>
								<Styled.BateriaSection>
									<Styled.BateriaColumn>
										<Checkbox.Group
											options={leftColumnOptions}
											value={selectedBaterias}
											onChange={handleBateriaChange}
											direction="vertical"
										/>
									</Styled.BateriaColumn>
									<Styled.BateriaColumn>
										<Checkbox.Group
											options={rightColumnOptions}
											value={selectedBaterias}
											onChange={handleBateriaChange}
											direction="vertical"
										/>
									</Styled.BateriaColumn>
								</Styled.BateriaSection>
							</Styled.FilterSection>
						</Styled.FilterColumn>*/}

						<Styled.FilterColumn>
							<Styled.FilterSection>
								<h4>Destination Plant</h4>
								<Checkbox.Group
									options={destinationOptions}
									value={selectedDestinations}
									onChange={handleDestinationChange}
									direction="vertical"
								/>
							</Styled.FilterSection>
						</Styled.FilterColumn>

						<Styled.FilterColumn>
							<h4>Project</h4>
							<Checkbox.Group
								options={projectOptions}
								value={selectedProjects}
								onChange={handleProjectChange}
								direction="vertical"
							/>
						</Styled.FilterColumn>
					</Styled.ModalContent>
				</Modal>
			</Styled.FilterContainer>
		</Styled.Header>
	);
};

export default GeneralFilter;
