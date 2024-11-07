// authRoute.js
import express from "express";
import {loginController, registerController, forgotPasswordController, testController } from '../controllers/registerController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login",loginController);

//forgot password || port
router.post('/forgot-password', forgotPasswordController)

router.get("/test",requireSignIn,isAdmin,testController);


export default router;
