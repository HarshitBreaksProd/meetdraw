import { Router } from "express";
import {
  signinController,
  signoutController,
  signupController,
} from "../controllers/authControllers";

const router: Router = Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);
router.route("/signout").post(signoutController);

export default router;
