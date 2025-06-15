import { Router } from "express";
import {
  signinController,
  signoutController,
  signupController,
  infoController,
} from "../controllers/authControllers";
import { authenticateUser } from "../middlewares/authenticateUser";

const router: Router = Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);
router.route("/signout").post(signoutController);
router.route("/info").get(authenticateUser, infoController);

export default router;
