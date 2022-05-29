import { Router } from "express";
import LoginController from "../controllers/login.controller";

const loginRoute = Router();

loginRoute.post("/", new LoginController().login);

export default loginRoute;
