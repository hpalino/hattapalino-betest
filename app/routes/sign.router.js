import express from "express";
import {signIn} from "../controllers/sign.controller.js";

const router = express.Router();
router.get('/', signIn);

export default router;
