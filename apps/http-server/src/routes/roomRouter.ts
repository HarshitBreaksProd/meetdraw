import { Router } from "express";
import { createRoomController, joinRoomController } from "../controllers/roomControllers";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.route("/create").post(authenticateUser, createRoomController);
router.route("/join").post(authenticateUser, joinRoomController);

export default router;
