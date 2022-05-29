import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String || Number,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  cost: {
    type: String || Number,
    required: true,
  },
  time: {
    type: String || Number,
    required: true,
  },
  likerEmail: {
    type: String,
    required: true,
  },
});

export default candidateSchema;
