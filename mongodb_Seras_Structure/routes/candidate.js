import express from "express";
import { RegistrationController } from "../controller/RegistrationController.js";
import { getQuestionController, } from "../controller/adminController.js";
import { upload } from '../middleware/upload.js'

const router = express.Router();

router.post('/verifyemail', RegistrationController.verifyemail);
router.post('/verifyOtp', RegistrationController.verifyOtp);
router.post('/documentRegistration/:aadharCardNumber', upload, RegistrationController.documentRegistration)
router.post('/login', RegistrationController.candidateLogin);
router.post('/payment', RegistrationController.payment);
router.post('/ExamPortal', getQuestionController);
router.post('/checkAadharNumber/:aadharNumber', RegistrationController.checkAadharNumberController);
router.post('/setEnrollId/:enrollPrefix', RegistrationController.setEnrollIdController);
export default router;