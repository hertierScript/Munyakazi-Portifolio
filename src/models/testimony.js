import mongoose from "mongoose";

const testimonySchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    testimony: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Testimony =
  mongoose.models.Testimony || mongoose.model("Testimony", testimonySchema);

export default Testimony;
