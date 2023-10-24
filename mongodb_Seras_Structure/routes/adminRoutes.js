// routes/examRoutes.js
import express from 'express';
import {createExam,createShift,uploadQuestionFile}  from '../controller/adminController.js';
const router = express.Router();
import {upload2} from '../middleware/upload.js'



// Exam Routes
router.post('/exams', createExam);
router.post('/uploadQuestionFile',upload2,uploadQuestionFile);
// router.post('/exams/:examId/shifts', createShift);
// router.post('/shifts:examid', createShift);
router.post('/shifts/:examid/:EnrollIDs', createShift);

// router.post('/exams/:examId/shifts', createShift);

export default router;