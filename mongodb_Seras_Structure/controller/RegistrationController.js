import { rsg, userDocument, exam, shift } from "../modules/Registration.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
var Candidate_key = process.env.Candidate_key;
var id;
console.log("candi:", Candidate_key);
// const maxAge = 3 * 24 * 60 * 60;

import { transporter } from '../modules/emailModule.js';
var lastEnrollmentID = 'ITEP0915';
const maxAge = 86400 * 1000;
// import bcrypt from "bcrypt";
import randomstring from 'randomstring';
var userdata = {}, otp = "";

var getaadhar;
export const SECRET_KEY = crypto.randomBytes(32).toString('hex');
class RegistrationController {

    static verifyemail = async (req, res) => {
        console.log(req.body.aadharNo);
        const olduser = await rsg.findOne({ aadharNo: req.body.aadharNo })
        userdata = req.body;
        if (olduser == null) {
            otp = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            console.log('otp : ', otp);
            var mailoption = {
                from: "dabidipesh7898@gmail.com",
                to: userdata.email,
                subject: `Infobeans Foundation ITEP Program`,
                text: `Hello ${userdata.username} your one time password is ${otp}`
            };
            transporter.sendMail(mailoption, (error, info) => {
                if (info) {
                    console.log('Email sent');
                    return res.status(201).json({ message: "Email Sent" });
                }
                else {
                    console.log('email not sent');
                    return res.status(404).json({ mesaage: "not sent" });
                }
            });
        } else {
            if (olduser.attempt > 0 && olduser.attempt < 4) {
                getaadhar = olduser.aadharNo;
                console.log("getaadhar : ", getaadhar);
                console.log("you have already register please upadte your documents")
                res.setHeader('Content-Type', 'application/json');
                return res.status(202).json({ message: 'you have already register please upadte your documents', aadharNo: getaadhar });
            } else {
                console.log("Contact to admin...");
            }

        }
    }


    static verifyOtp = async (req, res) => {
        console.log('hello');
        const userotp = req.body.userotp;
        if (otp == userotp) {
            console.log('otp verified');
            try {
                const hashpassword = await bcrypt.hash(userdata.password, 10);
                console.log(req.body.userotp);
                const user = await rsg.create({
                    username: userdata.username,
                    phoneNo: userdata.phoneNo,
                    aadharNo: userdata.aadharNo,
                    dob: userdata.dob,
                    email: userdata.email,
                    password: hashpassword,
                    attempt: 2
                });
                if (user) {
                    console.log("user id : ", user.id);
                    id = user._id;
                    return res.status(201).json({ message: 'Data saved', userID: user._id });
                }
            } catch (error) {
                console.log("error" + error);
            }
        }
        else {
            return res.status(403).json({ message: "Wrong Otp" });
        }

    }

    // question file upload

    static documentRegistration = async (req, res) => {
        console.log("in documentRegistration");
        var aadharFile = req.files['aadharFile'][0].originalname;
        var incomeCertificate = req.files['incomeCertificate'][0].originalname;
        var fatherAadharcard = req.files['fatherAadharcard'][0].originalname;
        var marksheet = req.files['marksheet'][0].originalname;
        var latestMarksheet = req.files['latestMarksheet'][0].originalname;

        function generateNextEnrollmentID(lastEnrollmentID) {
            const lastTwoDigits = parseInt(lastEnrollmentID.substr(6), 10);
            const nextTwoDigits = lastTwoDigits + 1;
            const newEnrollmentID = `ITEP09${nextTwoDigits.toString().padStart(2, '0')}`;
            return newEnrollmentID;
        }
        // Test the function
        var nextEnrollmentID = generateNextEnrollmentID(lastEnrollmentID);
        lastEnrollmentID = nextEnrollmentID;
        console.log(nextEnrollmentID); // Output: TEP0902
        console.log("id : ", id);

        try {
            const user = userDocument.create({
                userID: id,
                EnrollID: nextEnrollmentID,
                income: req.body.income,
                aadharFile: aadharFile,
                incomeCertificate: incomeCertificate,
                fatherAadharcard: fatherAadharcard,
                marksheet: marksheet,
                latestMarksheet: latestMarksheet,
                ClearRounds: 1
            });
            if (user) {
                console.log('data save', user);
                res.setHeader('Content-Type', 'application/json');
                return res.status(201).json({ message: 'Data saved', EnrollID: [0] });
            } else {
                return res.status(202).json({ message: 'Error....', EnrollID: [0] });

            }
        } catch (error) {
            console.log("error" + error);
        }
    }

    // update documents 
    // static updateDocuments = async (req, res) => {
    //     const olduser = await rsg.findOne({ aadharNo: getaadhar });

    //     const checkuser = await userDocument.findOne({ userID: olduser._id });

    //     console.log("in documentRegistration");
    //     var aadharFile = req.files['aadharFile'][0].originalname;
    //     var incomeCertificate = req.files['incomeCertificate'][0].originalname;
    //     var fatherAadharcard = req.files['fatherAadharcard'][0].originalname;
    //     var marksheet = req.files['marksheet'][0].originalname;
    //     var latestMarksheet = req.files['latestMarksheet'][0].originalname;

    //     // function generateNextEnrollmentID(lastEnrollmentID) {
    //     //     const lastTwoDigits = parseInt(lastEnrollmentID.substr(6), 10);
    //     //     const nextTwoDigits = lastTwoDigits + 1;
    //     //     const newEnrollmentID = `ITEP09${nextTwoDigits.toString().padStart(2, '0')}`;
    //     //     return newEnrollmentID;
    //     // }
    //     // // Test the function
    //     // var nextEnrollmentID = generateNextEnrollmentID(lastEnrollmentID);
    //     // lastEnrollmentID = nextEnrollmentID;
    //     // console.log(nextEnrollmentID); // Output: TEP0902
    //     // console.log("id : ", id);

    //     try {
    //         checkuser.updateOne({ userID: olduser._id }, {
    //             $set: {
    //                 userID: olduser._id,
    //                 EnrollID: "ITEP10",
    //                 income: req.body.income,
    //                 aadharFile: aadharFile,
    //                 incomeCertificate: incomeCertificate,
    //                 fatherAadharcard: fatherAadharcard,
    //                 marksheet: marksheet,
    //                 latestMarksheet: latestMarksheet,
    //                 ClearRounds: 0
    //             }
    //         });
    //         if (user) {
    //             console.log('data save', user);
    //             res.setHeader('Content-Type', 'application/json');
    //             return res.status(201).json({ message: 'Data saved', EnrollID: [0] });
    //         } else {
    //             return res.status(202).json({ message: 'Error....', EnrollID: [0] });

    //         }
    //     } catch (error) {
    //         console.log("error" + error);
    //     }
    // }

    static candidateLogin = async (request, response) => {
        console.log("in candidate controller");
        try {
            const { EnrollID, Password } = request.body;
            console.log(EnrollID)
            console.log(Password);
            const role = "";
            const user = {};
            //  var checkuser={};
            const checkuser = await userDocument.findOne({ EnrollID: EnrollID });
            if (checkuser == null) {
                return response.status(202).json({ message: 'EnrollID is wrong ' });
            }
            const checkuser1 = await rsg.findOne({ _id: checkuser.userID });
            console.log(" checkuser : ", checkuser.EnrollID);
            console.log(" checkuser1 : ", checkuser1.password);

            var pass = await bcrypt.compare(Password, checkuser1.password);
            console.log(pass)
            if ((checkuser.EnrollID == EnrollID) && (pass)) {
                checkuser1.attempt = checkuser1.attempt + 1;
                await checkuser1.save();
                const shifts = await shift.find();
                // console.log("shift data : ",shiftdata); 
                for (var shiftData of shifts) {
                    for (const candidate of shiftData.enrolledCandidates) {
                        if (candidate.EnrollID === EnrollID) {
                            response.cookie('EnrollID', EnrollID, { maxAge: 86400 * 1000 });
                            console.log(123);
                            candidate.Attendance = "Present";
                            await shiftData.save();
                            break;
                        }
                    }
                }
                return response.status(201).json({ message: 'Login succussfully...' });
            }
            else if (!checkuser.EnrollID == EnrollID) {
                return response.status(202).json({ message: 'EnrollID is wrong ' });

            } else if (!pass) {
                return response.status(203).json({ message: 'password is wrong ' });

            } else {
                console.log("somthing went wrong.....");
                // return response.status(202).json({ message: 'Something went wrong...' });

            }
            // console.log("user :" + user)
            // const payload = user;
            // console.log("pppp :" + payload)
            // const expiryTime = {
            //     expiresIn: '1d'
            // }
            // const token = jwt.sign(payload, SECRET_KEY, expiryTime);
            // response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
            // if (!token) {
            //     response.json({ message: "Error Occured while dealing with Token" });
            // }
            // response.redirect('/home1');
        } catch (err) {
            console.log("error : " + err);
        }
    }

    // static authenticateJWT = (request, response, next) => {
    //     console.log("authenticateJWT : ");
    //     const token = request.cookies.jwt;
    //     if (!token) {
    //         response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    //     }
    //     jwt.verify(token, SECRET_KEY, (err, payload) => {
    //         if (err)
    //             response.json({ message: "Error Occured while dealing with Token during verify" });
    //         request.payload = payload;
    //         next();
    //     });
    // }

    // static authorizeUser = (request, response, next) => {
    //     console.log("authorizeUser : ");
    //     console.log(request.payload.aadharFile)
    //     if (request.payload.role == "admin")
    //         response.render("admin");
    //     else if (request.payload.role == "user")
    //         response.render("home", { email: request.payload.email, aadharFile: request.payload.aadharFile });
    //     next();
    // }

    // static viewProfile = async (req, res) => {
    //     try {
    //         console.log(req.params.email)
    //         res.cookie('jwt', " ", { httpOnly: true, maxAge: 1 });

    //         res.render("home", { email: "", aadharFile: "" });
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
}
export { RegistrationController };