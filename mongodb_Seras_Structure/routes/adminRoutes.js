// routes/examRoutes.js
import express from 'express';
import {verifyAdmin,adminLoginController,createExam,createShift,uploadQuestionFile,readExcelController,getQuestionController , viewRegistrationCandidate , viewRegistrationCandidateDocument , allowUser , addPlacementRecord , viewplacementRecord}  from '../controller/adminController.js';
const router = express.Router();
import {upload2 , upload3} from '../middleware/upload.js'

router.post('/verifyAdmin',verifyAdmin);
router.post('/adminLogin',adminLoginController);
// Exam Routes
router.post('/exams', createExam);
router.post('/uploadQuestionFile',upload2,uploadQuestionFile,readExcelController);
// router.post('/exams/:examId/shifts', createShift);
// router.post('/shifts:examid', createShift);
router.post('/shifts/:examid', createShift);
router.get('/viewRegistrationCandidate' , viewRegistrationCandidate)
router.post('/viewRegistrationCandidateDocument/:userId' , viewRegistrationCandidateDocument)
router.post('/allowUser/:userId' , allowUser)
router.post('/addPlacementRecord' ,upload3,addPlacementRecord );
router.get('/viewPlacementRecord' , viewplacementRecord);
// router.post('/exams/:examId/shifts', createShift);

export default router;