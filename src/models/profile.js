import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    cvFile: {
      type: String, // URL to CV file
      required: false,
    },
    cvExternalLink: {
      type: String, // External link to CV (Google Drive, etc.)
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    introText: {
      type: String,
      required: false,
    },
    mission: {
      type: String,
      required: false,
    },
    vision: {
      type: String,
      required: false,
    },
    experience: [
      {
        title: { type: String, required: false },
        company: { type: String, required: false },
        period: { type: String, required: false },
        description: { type: String, required: false },
      },
    ],
    education: [
      {
        title: { type: String, required: false },
        school: { type: String, required: false },
        period: { type: String, required: false },
        description: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
