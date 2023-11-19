import express from "express";
import { RegistrationController } from "../controller/RegistrationController.js";
import { getQuestionController } from "../controller/adminController.js";
// import { SECRET_KEY } from '../controller/RegistrationController.js'
const router = express.Router();
import {upload} from '../middleware/upload.js'
router.post('/verifyemail', RegistrationController.verifyemail);
router.post('/verifyOtp', RegistrationController.verifyOtp);
router.post('/documentRegistration/:userID',upload, RegistrationController.documentRegistration)
router.post('/login', RegistrationController.candidateLogin);
router.post('/ExamPortal',getQuestionController);

// router.get('/', (req, res) => {
//     res.render('home', { email: "", aadharFile: "" });
// })
// router.post('/register', (req, res) => {
//    console.log("hello in routes",req.body);
// });
// router.get('/login', (req, res) => {
//     console.log("loooogggggvhbkjnj");
//     const token = req.cookies.jwt;
//     if(token){
//         jwt.verify(token,SECRET_KEY,(err,decodedToken) =>{
//             console.log(decodedToken);
//             if(err){
//                 res.render("login");
//             }else{
//                 res.render("home",{email:decodedToken.email,aadharFile:decodedToken.aadharFile});
//             }
//         });
//     }else{
//         res.render("login");
//     }
//     // res.render('login');
// });


// router.post('/registration',upload, RegistrationController.createDoc)
// router.post('/logincheck', RegistrationController.loginCheck)
// router.get('/home1', RegistrationController.authenticateJWT, RegistrationController.authorizeUser, (request, response) => {
console.log("Task Complete");
// });
// router.get('/logout/:email', RegistrationController.viewProfile);
export default router;