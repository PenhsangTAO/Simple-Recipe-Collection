import { Router } from "express";
import { regUser, loginUser } from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js"

const router = Router()

router.route('/register').post(regUser);
router.route('/login').post(loginUser);
router.route("/me").get(auth,)


export default router