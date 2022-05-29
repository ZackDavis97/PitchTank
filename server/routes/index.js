import { Router } from "express";
import ThisForthatController from "../controllers/thisforthat.controller";
import candidateRoute from "./candidate.route";
import loginRoute from "./login.route";
import registerRoute from "./register.route";

const router = Router();

router.get("/thisforthat", new ThisForthatController().getIdea);
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/candidate", candidateRoute);

export default router;
