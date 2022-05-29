import mongoose from "mongoose";
import candidateSchema from "../schemas/candidate.schema";

const Candidate = mongoose.model("Candidate", candidateSchema);

export default class CandidateController {
  async create(req, res) {
    try {
      const candidate = await Candidate.create(req.body);
      res.json({
        status: "success",
        text: "Candidate Liked successfully",
        candidate: candidate,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }

  async getCandidateByEmail(req, res) {
    try {
      const candidate = await Candidate.find({
        likerEmail: req.params.email,
      });
      res.json({
        status: "success",
        text: "Candidate found successfully",
        candidate: candidate,
      });
      console.log(req.params.email);
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }

  async deleteCandidate(req, res) {
    try {
      const candidate = await Candidate.deleteOne({
        _id: req.params.id,
      });
      res.json({
        status: "success",
        text: "Candidate deleted successfully",
        candidate: candidate,
        deletedId: req.params.id,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }

  async deleteAll(req, res) {
    try {
      const candidate = await Candidate.deleteMany({});
      res.json({
        status: "success",
        text: "Candidate deleted successfully",
        candidate: candidate,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        text: "Something went wrong",
      });
    }
  }
}
