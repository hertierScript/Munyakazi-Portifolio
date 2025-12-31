import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: false,
    },
    live: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    tags: [{
      type: String,
      required: true,
    }],
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;