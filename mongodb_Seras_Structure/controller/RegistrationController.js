import { rsg, questionPaper, lastEnrollModel } from "../modules/Registration.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import stripe from 'stripe';
import { transporter } from '../modules/emailModule.js';
import randomstring from 'randomstring';

dotenv.config();

const { STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);
var id = "None";
var enrollPrefix = 'ITEP09';
var lastEnroll = '';
var initialEnrollId = enrollPrefix + '0001';
var userdata = {}, otp = "";
var getaadhar;

export const SECRET_KEY = crypto.randomBytes(32).toString('hex');

class RegistrationController {
    static verifyemail = async (req, res) => {
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
                } else {
                    console.log('email not sent');
                    return res.status(404).json({ mesaage: "not sent" });
                }
            });
        } else {
            if (olduser.attempt > 0 && olduser.attempt < 4) {
                getaadhar = olduser.aadharNo;
                id = olduser._id
                res.setHeader('Content-Type', 'application/json');
                return res.status(202).json({ message: 'you have already register please upadte your documents', aadharNo: getaadhar });
            } else {
                console.log("Contact to admin...");
            }
        }
    }

    static verifyOtp = async (req, res) => {
        const userotp = req.body.userotp;
        if (otp == userotp) {
            try {
                const year = new Date().getFullYear();
                const month = new Date().getMonth() + 1;
                const day = new Date().getDate();
                const date = `${year}-${month}-${day}`;
                const hashpassword = await bcrypt.hash(userdata.password, 10);
                const user = await rsg.create({
                    username: userdata.username,
                    phoneNo: userdata.phoneNo,
                    aadharNo: userdata.aadharNo,
                    dob: userdata.dob,
                    email: userdata.email,
                    password: hashpassword,
                    address: userdata.address,
                    city: userdata.city,
                    state: userdata.state,
                    attempt: 0,
                    income: "",
                    aadharFile: "",
                    incomeCertificate: "",
                    fatherAadharcard: "",
                    marksheet: "",
                    latestMarksheet: "",
                    ClearRounds: 0,
                    registrationDate: date
                });
                if (user) {
                    id = user._id;
                    return res.status(201).json({ message: 'Data saved', userID: user._id });
                }
            } catch (error) {
                console.log("error", error);
            }
        } else {
            return res.status(403).json({ message: "Wrong Otp" });
        }
    }

    static setEnrollIdController = async (req, res) => {
        const enrollPrefix = req.params.enrollPrefix;
        const result = await lastEnrollModel.findOneAndUpdate({}, { lastEnrollId: enrollPrefix });
        if (!result) {
            lastEnrollModel.create({
                lastEnrollId: enrollPrefix
            })
        }
    }

    static documentRegistration = async (req, res) => {
        let aadharCardNumber = req.params.aadharCardNumber;
        var aadharFile = req.files['aadharFile'][0].originalname;
        var incomeCertificate = req.files['incomeCertificate'][0].originalname;
        var fatherAadharcard = req.files['fatherAadharcard'][0].originalname;
        var marksheet = req.files['marksheet'][0].originalname;
        var latestMarksheet = req.files['latestMarksheet'][0].originalname;
        const lastId = await lastEnrollModel.find();

        function generateNextEnrollmentID() {
            var lastEnrollId = lastId[0].lastEnrollId;
            var lastDigits = parseInt(lastEnrollId.substring(6).toString());
            lastDigits++;
            lastDigits = lastDigits.toString().padStart(4, '0');
            var enrollId = (lastEnrollId.substring(0, 6).toString()) + lastDigits;
            return enrollId;
        }
        var nextEnrollmentID = generateNextEnrollmentID();
        lastEnroll = nextEnrollmentID;
        await lastEnrollModel.findOneAndUpdate({}, { lastEnrollId: lastEnroll });
        try {
            if (id == "None") {
                const user = await rsg.updateOne({ aadharNo: aadharCardNumber }, {
                    $push: {
                        EnrollID: {
                            enrollID: lastEnroll,
                            score: 0
                        }
                    },
                    $set: {
                        income: req.body.income,
                        aadharFile: aadharFile,
                        incomeCertificate: incomeCertificate,
                        fatherAadharcard: fatherAadharcard,
                        marksheet: marksheet,
                        latestMarksheet: latestMarksheet,
                        ClearRounds: 1
                    }
                });
                if (user) {
                    res.setHeader('Content-Type', 'application/json');
                    return res.status(201).json({ message: 'Data saved', EnrollID: [0] });
                } else {
                    return res.status(202).json({ message: 'Error....', EnrollID: [0] });
                }
            } else {
                const user = await rsg.updateOne({ _id: id }, {
                    $push: {
                        EnrollID: {
                            enrollID: lastEnroll,
                            score: 0
                        }
                    },
                    $set: {
                        income: req.body.income,
                        aadharFile: aadharFile,
                        incomeCertificate: incomeCertificate,
                        fatherAadharcard: fatherAadharcard,
                        marksheet: marksheet,
                        latestMarksheet: latestMarksheet,
                        ClearRounds: 1
                    }
                });
                if (user) {
                    res.setHeader('Content-Type', 'application/json');
                    return res.status(201).json({ message: 'Data Update', EnrollID: [0] });
                } else {
                    return res.status(202).json({ message: 'Error....', EnrollID: [0] });
                }
            }
        } catch (error) {
            console.log("error" + error);
        }
    }

    static candidateLogin = async (request, response) => {
        try {
            const { EnrollID, Password } = request.body;
            const checkuser = await rsg.findOne({ 'EnrollID.enrollID': EnrollID });
            if (checkuser == null) {
                return response.status(202).json({ message: 'EnrollID is wrong' });
            }
            var pass = await bcrypt.compare(Password, checkuser.password);
            if ((pass)) {
                if (checkuser.EnrollID[checkuser.EnrollID.length - 1].Allowance === "Allowed") {

                    for (const candidate of checkuser.EnrollID) {
                        candidate.Allowance = "NotAllow"
                        await checkuser.save();

                        if (candidate.enrollID === EnrollID) {
                            if (candidate.Attendance !== "Present") {
                                checkuser.attempt = checkuser.attempt + 1;
                                candidate.Attendance = "Present";
                                await checkuser.save();
                                break;
                            } else if (candidate.Attendance === "Present" && candidate.RemainingTime !== 0) {
                                break;
                            } else {
                                return response.status(204).json({ message: 'You Already Given the Exam' });
                            }
                        }
                    }
                    return response.status(201).json({ message: 'Login succussfully...', user: checkuser });
                } else {
                    return response.status(203).json({ message: 'You are not allowed for exam. Contact to admin' });
                }
            } else if (!checkuser.EnrollID.enrollID == EnrollID) {
                return response.status(202).json({ message: 'EnrollID is wrong 1' });
            } else if (!pass) {
                return response.status(203).json({ message: 'password is wrong ' });
            } else {
                console.log("somthing went wrong.....");
            }
        } catch (err) {
            console.log("error : ", err);
        }
    }

    static checkAadharNumberController = async (request, response) => {
        var aadharNumber = request.params.aadharNumber;
        try {
            var existinuseraadharnumber = await rsg.findOne({ aadharNo: aadharNumber });
            if (existinuseraadharnumber == null) {
                response.json(false);
            } else if (existinuseraadharnumber.attempt >= 3) {
                existinuseraadharnumber.examAllow = false;
                await existinuseraadharnumber.save();
                response.json(1);
            } else {
                response.json(existinuseraadharnumber.aadharNo);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }

    static updateQuestionWithAnswer = async (request, response) => {
        var obj = request.body;
        var QuestionPaperObject = await questionPaper.findOne({ EnrollID: obj.EnrollID })
        QuestionPaperObject.paper[obj.currentSubjectIndex].questions[obj.currentQuestionIndex].answerStatus = obj.answerStatus;
        QuestionPaperObject.paper[obj.currentSubjectIndex].questions[obj.currentQuestionIndex].selectedAnswer = obj.userAnswer;
        QuestionPaperObject.paper[obj.currentSubjectIndex].questions[obj.currentQuestionIndex].answerColor = obj.selectedColor;
        await QuestionPaperObject.save();
        response.status(201).json({ message: "Updated" });
    }

    static updateColor = async (request, response) => {
        var obj = request.body;
        var QuestionPaperObject = await questionPaper.findOne({ EnrollID: obj.EnrollID })
        QuestionPaperObject.paper[obj.currentSubjectIndex].questions[obj.currentQuestionIndex].answerColor = obj.selectedColor;
        await QuestionPaperObject.save();
        response.status(201).json({ message: "Updated" });
    }

    static updateRemainingTime = async (request, response) => {
        var enrollId = request.query.enrollId;
        try {
            const checkuser = await rsg.findOne({ 'EnrollID.enrollID': enrollId });
            checkuser.EnrollID[checkuser.EnrollID.length - 1].RemainingTime = request.body.minutes;
            await checkuser.save();
            response.status(201).json({ msg: "time updated successfully" });
        } catch (err) {
            console.log("error : ", err);
            response.status(203).json({ msg: "error while updating time" });
        }
    }

    static endTest = async (request, response) => {
        var score = 0;
        var QuestionPaperObject = await questionPaper.findOne({ EnrollID: request.params.EnrollID })
        for (const subject of QuestionPaperObject.paper) {
            for (const question of subject.questions) {
                const answerStatus = question.answerStatus;
                if (answerStatus) {
                    score++;
                }
            }
        }
        QuestionPaperObject.Score = score;
        await QuestionPaperObject.save();

        await rsg.updateOne(
            { "EnrollID.enrollID": request.params.EnrollID },
            { $set: { "EnrollID.$.score": score, "EnrollID.$.RemainingTime": 0 } }
        );
        response.status(201).json({ message: "End Test Completed" });
    }

    static payment = async (req, res) => {
        const detail = {
            enrollId: 123,
            amount: 10000,
            currency: 'inr'
        };
        try {
            const session = await stripeInstance.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: detail.currency,
                        product_data: {
                            name: 'Product Name',
                        },
                        unit_amount: detail.amount,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'http://localhost:3000/registration',
                cancel_url: 'http://localhost:3000/registration'
            });
            res.json({ id: session.id });
        } catch (error) {
            console.error('Error creating Stripe session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export { RegistrationController };