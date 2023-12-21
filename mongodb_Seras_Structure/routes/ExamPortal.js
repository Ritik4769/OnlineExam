import express from "express";
import { RegistrationController } from "../controller/RegistrationController.js";

const router = express.Router();

router.post('/updateAnswer', RegistrationController.updateQuestionWithAnswer);
router.post('/updateColor', RegistrationController.updateColor);
router.post('/updateTime', RegistrationController.updateRemainingTime);
router.post('/EndTest/:EnrollID', RegistrationController.endTest);

export default router;