import { Router } from "express";
import CandidateController from "../controllers/candidate.controller";

const candidateRoute = Router();

candidateRoute.get(
  "/get/:email",
  new CandidateController().getCandidateByEmail
);

candidateRoute.post("/add", new CandidateController().create);

candidateRoute.delete("/delete/:id", new CandidateController().deleteCandidate);
candidateRoute.delete("/deleteAll", new CandidateController().deleteAll);

export default candidateRoute;
