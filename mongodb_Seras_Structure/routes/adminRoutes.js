import express from 'express';
import { verifyAdmin, sendMessageController,houseVisitShow, updateFacultuyController, adminLoginController,uploadHomeFile, examControllerName,readExcelHomeController, viewShiftNumber, createExam, createShift, uploadQuestionFile, readExcelController, getQuestionController, viewRegistrationCandidate, viewRegistrationCandidateDocument, allowUser, addPlacementRecord, viewplacementRecord, viewShiftRecord, deletePlacementRecord, addFacultyController, addBatchController,getTrainersController,getManagersController,addCenterController,getBatchDetailsControllers ,addBannerController,getCentersController,readExcelInterviewController,uploadInterviewFile,interViewShow,getFacultiesController,searchFacultiesController,deleteFacultyController} from '../controller/adminController.js';
import { upload2, upload3, upload4, upload5,upload6,upload7,upload8,upload9 } from '../middleware/upload.js'

const router = express.Router();

router.post('/verifyAdmin', verifyAdmin);
router.post('/adminLogin', adminLoginController);
router.post('/exams', createExam);
router.post('/uploadQuestionFile', upload2, uploadQuestionFile, readExcelController);
router.post('/shifts', createShift);
router.get('/viewRegistrationCandidate', viewRegistrationCandidate)
router.post('/viewRegistrationCandidateDocument/:userId', viewRegistrationCandidateDocument)
router.post('/allowUser/:userId', allowUser)
router.post('/addPlacementRecord', upload3, addPlacementRecord);
router.get('/viewPlacementRecord', viewplacementRecord);
router.get('/viewShiftRecord', viewShiftRecord);
router.post('/deletePlacementRecord/:userId', deletePlacementRecord);
router.get('/viewShiftNumber', viewShiftNumber);
router.post('/addFaculty', upload4, addFacultyController)
router.post('/addBatch', upload5, addBatchController)
router.get('/examControllerName', examControllerName);
router.get("/getTrainers",getTrainersController)
router.get("/getManagers",getManagersController)
router.get("/getBatchDetails",getBatchDetailsControllers)
router.post("/addCenter",upload6,addCenterController)
router.post("/addBanner",upload7,addBannerController)
router.get("/getCenters",getCentersController);
router.post('/uploadInterviewFile', upload8, uploadInterviewFile, readExcelInterviewController);
router.get('/interViewShow', interViewShow);
router.get("/getFaculties",getFacultiesController)
router.get("/searchFaculties",searchFacultiesController)
router.get("/deleteFaculty",deleteFacultyController)
router.post("/updateFaculty",upload4,updateFacultuyController)
router.post('/uploadHomeFile', upload9, uploadHomeFile, readExcelHomeController);
router.post('/message', sendMessageController);
// router.post('/messageResult', sendResultMessageController);
router.get('/houseVisitShow', houseVisitShow);


export default router;