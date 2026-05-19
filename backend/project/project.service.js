const Project = require("./project.model");

const getProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId)
      .populate("members", "email name _id profilePicture")
      .populate("owner", "email name _id profilePicture")
      .populate("diagrams");

    if (!project) {
      return { success: false, message: "Project not found" };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error("Error fetching project details:", error);
    return { success: false, message: error.message };
  }
};

const addDiagramToProject = async (projectId, diagramId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return { success: false, message: "Project not found" };
    }

    project.diagrams.push(diagramId);
    await project.save();
    return { success: true, data: project };
  } catch (error) {
    console.error("Error adding diagram to project:", error);
    return { success: false, message: error.message };
  }
};

const removeDiagramFromProject = async (projectId, diagramId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return { success: false, message: "Project not found" };
    }

    project.diagrams.pull(diagramId);
    await project.save();
    return { success: true, data: project };
  } catch (error) {
    console.error("Error removing diagram from project:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  getProjectById,
  addDiagramToProject,
  removeDiagramFromProject,
};
