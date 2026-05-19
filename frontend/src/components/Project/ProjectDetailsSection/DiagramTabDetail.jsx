import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { IoIosFolderOpen } from "react-icons/io";

import api from "../../../api";
import ShowError from "../../../overlays/ShowError";

import PrimaryButton from "../../../utils/Buttons/PrimaryButton";
import SecondaryInput from "../../../utils/Inputs/SecondaryInput";
import PrimaryModal from "../../../utils/Modals/PrimaryModal";
import TextAreas from "../../../utils/Inputs/TextAreas";

import DiagramCard from "./Diagrams/DiagramCard";
import DiagramDetailsModal from "./Diagrams/DiagramDetailModel";

const DiagramTabDetail = ({
  diagrams = [],
  projectName,
  projectStatus,
  handleVersionsClick,
  selectedVersion,
  refreshProject,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/");
  const projectId = pathParts[2];

  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  const [diagramName, setDiagramName] = useState("");
  const [diagramDescription, setDiagramDescription] = useState("");
  const [diagramNameError, setDiagramNameError] = useState("");
  const [diagramDescriptionError, setDiagramDescriptionError] = useState("");

  const openCreateModal = () => {
    setShowCreateModal(true);
    setDiagramName("");
    setDiagramDescription("");
    setDiagramNameError("");
    setDiagramDescriptionError("");
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateDiagram = async () => {
    let hasError = false;
    if (!diagramName.trim()) {
      setDiagramNameError("Diagram name is required.");
      hasError = true;
    }
    if (!diagramDescription.trim()) {
      setDiagramDescriptionError("Description is required.");
      hasError = true;
    }
    if (hasError) return;

    try {
      const payload = { name: diagramName, description: diagramDescription };
      const res = await api.post(
        `/api/diagram/newDiagram/${projectId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        closeCreateModal();
        refreshProject();
        const newId = res.data.message.diagramId;
        navigate(`Canvas/${newId}`, {
          state: { diagrams, projectName, projectStatus },
        });
      } else {
        ShowError({ text: res.data.message, onClose: () => {} });
      }
    } catch (err) {
      console.error("Error creating diagram:", err);
    }
  };

  const filteredDiagrams = Array.isArray(diagrams)
    ? diagrams.filter(
        (d) =>
          typeof d === "object" &&
          d !== null &&
          d.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <section className="py-6 rounded-md bg-white dark:bg-dark px-4">
      <div className="hidden md:flex justify-between items-center mb-4">
        {projectStatus === "Active" && !selectedVersion ? (
          <PrimaryButton text="+ New Diagram" action={openCreateModal} />
        ) : (
          <div />
        )}
        <div className="flex items-center space-x-3">
          <PrimaryButton text="Versions" action={handleVersionsClick} />
          <SecondaryInput
            placeHolder="Search diagrams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 mb-4 md:hidden">
        <SecondaryInput
          placeHolder="Search diagrams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-3">
          {!selectedVersion && projectStatus === "Active" && (
            <PrimaryButton text="+" action={openCreateModal} />
          )}
          <PrimaryButton text="Versions" action={handleVersionsClick} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiagrams.length > 0 ? (
          filteredDiagrams.map((diagram) => (
            <DiagramCard
              selectedVersion={selectedVersion}
              key={diagram._id}
              id={diagram._id}
              name={diagram.name}
              description={diagram.description}
              refreshDiagrams={refreshProject}
              onClick={() => setSelectedDiagram(diagram)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center py-12 text-gray-500 dark:text-gray-400">
            <IoIosFolderOpen size={48} />
            <p className="mt-2">No diagrams available</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <PrimaryModal
          onClose={closeCreateModal}
          heading="New Diagram"
          buttonText="Create"
          onSubmit={handleCreateDiagram}
        >
          <form className="flex flex-col gap-6 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Diagram Name
              </label>
              <SecondaryInput
                placeHolder="Enter diagram name"
                value={diagramName}
                onChange={(e) => {
                  setDiagramName(e.target.value);
                  setDiagramNameError("");
                }}
                error={diagramNameError}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Description
              </label>
              <TextAreas
                placeholder="Description..."
                value={diagramDescription}
                onChange={(e) => {
                  setDiagramDescription(e.target.value);
                  setDiagramDescriptionError("");
                }}
                error={diagramDescriptionError}
              />
            </div>
          </form>
        </PrimaryModal>
      )}

      {selectedDiagram && (
        <DiagramDetailsModal
          diagram={selectedDiagram}
          onClose={() => setSelectedDiagram(null)}
          refreshDiagrams={refreshProject}
        />
      )}
    </section>
  );
};

export default DiagramTabDetail;
