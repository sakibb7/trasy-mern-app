import { Router } from "express";
import {
  getRemoveHanlder,
  getUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

//prefix: /user
userRoutes.get("/", getUserHandler);
userRoutes.delete("/remove", getRemoveHanlder);

export default userRoutes;
