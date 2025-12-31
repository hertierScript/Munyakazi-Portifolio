import mongoose from "mongoose";

const forexSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    week: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Forex =
  mongoose.models.Forex ||
  mongoose.model("Forex", forexSchema);

export default Forex;