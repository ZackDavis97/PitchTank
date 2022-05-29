import { Router } from "express";
import RegisterUser from "../controllers/register.controller";

const registerRoute = Router();

registerRoute.post("/", new RegisterUser().register);

export default registerRoute;
