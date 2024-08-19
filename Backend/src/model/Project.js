const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    updatedDate: {
      type: String,
      required: true
    },
    episodes: {
      type: Array,
      default: []
    },
    // The ID of the user associated with this student message
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
