import express from 'express';
import {
     deleteCompanyController, updateCompanyController , deleteBatchController, updateBatchController,  sendOneMessageController, sendSingleMessageController, sendResultMessageController, verifyAdmin, sendMessageController, houseVisitShow, updateFacultuyController,
     adminLoginController, uploadHomeFile, examControllerName, readExcelHomeController,
     viewShiftNumber, createExam, createShift, uploadQuestionFile, readExcelController,
     getQuestionController, viewRegistrationCandidate, viewRegistrationCandidateDocument,
     allowUser, addPlacementRecord, viewplacementRecord, viewShiftRecord, deletePlacementRecord,
     addFacultyController, addBatchController, getTrainersController, getManagersController,
     addCenterController, getBatchDetailsControllers, addBannerController, getCentersController,
     readExcelInterviewController, uploadInterviewFile, interViewShow, getFacultiesController,
     searchFacultiesController, deleteFacultyController, getBannerdetailsController,
     addCompanyController, getCompaniesController, getAchivementsController, EndTestByAdminController, 
     GenerateResultByAdminController, AllowCandidate,getBannerData,deleteBanner,updateBanner,
     getCenterData,deleteCenter,updateCenter, addGalleryDataController ,  getSliderDataController ,getGalleryDataController , deleteGalleryController, updateGalleryController,verifyAdminEmailController,forgotPasswordController,verifyOtpController
} from '../controller/adminController.js';
import { upload2, upload3, upload4, upload5, upload6, upload7, upload8, upload9, upload10, upload11 } from '../middleware/upload.js'

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
router.post('/addBatch', upload5, addBatchController);
router.get('/examControllerName', examControllerName);
router.get("/getTrainers", getTrainersController)
router.get("/getManagers", getManagersController)
router.get("/getBatchDetails", getBatchDetailsControllers)
router.post("/addCenter", upload6, addCenterController)
router.post("/addBanner", upload7, addBannerController)
router.get("/getbannerDetails", getBannerdetailsController)
router.get("/getCenters", getCentersController);
router.post('/uploadInterviewFile', upload8, uploadInterviewFile, readExcelInterviewController);
router.get('/interViewShow', interViewShow);
router.get("/getFaculties", getFacultiesController)
router.get("/searchFaculties", searchFacultiesController)
router.get("/deleteFaculty", deleteFacultyController)
router.get("/deleteBatch", deleteBatchController)
router.get("/deleteCompany", deleteCompanyController)
router.post("/updateFaculty", upload4, updateFacultuyController);
router.post("/updateBatch", upload5, updateBatchController);
router.post("/updateCompany", upload10, updateCompanyController);
router.post('/uploadHomeFile', upload9, uploadHomeFile, readExcelHomeController);
router.post('/message', sendMessageController);
router.post('/singleMessage', sendSingleMessageController);
router.post('/oneMessage', sendOneMessageController);
router.post('/messageResult', sendResultMessageController);
router.get('/houseVisitShow', houseVisitShow);
router.post("/addCompany", upload10, addCompanyController)
router.get("/getCompanies", getCompaniesController)
router.get("/getAchivements", getAchivementsController)
router.post('/EndTestByAdmin', EndTestByAdminController);
router.post('/GenerateResultByAdmin', GenerateResultByAdminController);
router.post('/AllowCandidate', AllowCandidate);
router.get('/getBannerData',getBannerData);
router.post('/deleteBanner',deleteBanner,getBannerData);
router.post('/updateBanner',upload7,updateBanner,getBannerData);
router.get('/getCenterData',getCenterData);
router.post('/deleteCenter',deleteCenter,getCenterData);
router.post('/updateCenter',upload6,updateCenter,getCenterData)

router.post("/addGalleryData", upload11, addGalleryDataController)
router.get("/getSliderData/:category", getSliderDataController);
router.get("/getGalleryData", getGalleryDataController);
router.get("/deleteGallery", deleteGalleryController)
router.post("/updateGalleryData",upload11, updateGalleryController)

router.post('/verifyAdminEmail', verifyAdminEmailController);
router.post('/forgotPassword', forgotPasswordController);
router.post('/verifyOtp', verifyOtpController);

export default router;