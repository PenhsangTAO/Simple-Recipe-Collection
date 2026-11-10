import { Router } from "express";
import regUser from "../controller/user.controller.js";

const router = Router()

router.route('/register').post(regUser);


export default router