const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "Completed", "Archived"],
      default: "Active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectImage: { type: String, default: "" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    diagrams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diagram" }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }],
  },
  { timestamps: true }
);

projectSchema.virtual("diagramCount").get(function () {
  return this.diagrams?.length;
});

projectSchema.virtual("discussionCount").get(function () {
  return this.discussions?.length;
});

projectSchema.virtual("memberCount").get(function () {
  return this.members?.length;
});

projectSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Project", projectSchema);
