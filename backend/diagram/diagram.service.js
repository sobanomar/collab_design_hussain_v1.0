const Diagram = require("./diagram.model");

const createDiagram = async (diagramData) => {
  try {
    const newDiagram = new Diagram(diagramData);
    const savedDiagram = await newDiagram.save();
    return { success: true, data: savedDiagram };
  } catch (error) {
    console.error("Error creating diagram:", error);
    return { success: false, message: error.message };
  }
};

const deleteDiagram = async (diagramId) => {
  try {
    const deletedDiagram = await Diagram.findByIdAndDelete(diagramId);
    if (!deletedDiagram) {
      return { success: false, message: "Diagram not found" };
    }
    return { success: true, data: deletedDiagram };
  } catch (error) {
    console.error("Error deleting diagram:", error);
    return { success: false, message: error.message };
  }
};

const getAllDiagrams = async (projectId) => {
  try {
    const diagrams = await Diagram.find({ projectId: projectId });
    if (!diagrams || diagrams.length === 0) {
      return { success: false, message: "No diagrams found for this project" };
    }
    return { success: true, data: diagrams };
  } catch (error) {
    console.error("Error fetching diagrams:", error);
    return { success: false, message: error.message };
  }
};

const updateDiagram = async (diagramId, updateData) => {
  try {
    const updatedDiagram = await Diagram.findByIdAndUpdate(
      diagramId,
      updateData
    );

    if (!updatedDiagram) {
      return { success: false, message: "Diagram not found" };
    }
    return { success: true, data: updatedDiagram };
  } catch (error) {
    console.error("Error updating diagram:", error);
    return { success: false, message: error.message };
  }
};

async function getDiagramById(diagramId) {
  try {
    const diagram = await Diagram.findById(diagramId);
    if (!diagram) {
      return { success: false, message: "Diagram not found" };
    }
    return { success: true, data: diagram };
  } catch (error) {
    console.error("Error in getDiagramById:", error);
    return { success: false, message: error.message };
  }
}

async function updateDiagramById(diagramId, updateFields) {
  try {
    const diagram = await Diagram.findByIdAndUpdate(
      diagramId,
      { $set: updateFields },
      { new: true }
    );

    if (!diagram) {
      return { success: false, message: "Diagram not found" };
    }

    return { success: true, data: diagram };
  } catch (error) {
    console.error("DB update error:", error);
    return { success: false, message: "Failed to update diagram" };
  }
}

module.exports = {
  createDiagram,
  deleteDiagram,
  getAllDiagrams,
  updateDiagram,
  getDiagramById,
  updateDiagramById,
};
