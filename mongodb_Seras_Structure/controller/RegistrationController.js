import { rsg, userDocument,exam } from "../modules/Registration.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
// const maxAge = 3 * 24 * 60 * 60;

import {transporter} from '../modules/emailModule.js';
var lastEnrollmentID = 'ITEP0903';
const maxAge = 86400*1000;
// import bcrypt from "bcrypt";
import randomstring from 'randomstring';
var userdata={},otp="";

export const SECRET_KEY = crypto.randomBytes(32).toString('hex');
class RegistrationController {

    static verifyemail =async(req,res)=>{
        userdata=req.body;
        console.log(userdata);
        otp=randomstring.generate({
         length:4,
         charset:'numeric'
        });
        var mailoption={
         from:"dabidipesh7898@gmail.com",
         to:userdata.email,
         subject:`Infobeans Foundation ITEP Program`,
         text:`Hello ${userdata.username} your one time password is ${otp}`
        };
        transporter.sendMail(mailoption,(error,info)=>{
         if(info){
             console.log('Email sent');
             return res.status(201).json({message:"Email Sent"});
         }
         else{
             console.log('email not sent');
             return res.status(404).json({mesaage:"not sent"});
         }
        });
     }


     static verifyOtp=async(req,res)=>{
        console.log('hello');
        
        const userotp=req.body.userotp;
        if(otp==userotp){
            console.log('otp verified');
            try {
                const hashpassword = await bcrypt.hash(userdata.password,10);
                console.log(req.body.userotp);
                const user = await rsg.create({
                    username: userdata.username,
                    phoneNo: userdata.phoneNo,
                    aadharNo: userdata.aadharNo,
                    dob: userdata.dob,
                    email: userdata.email,
                    password:hashpassword,
                    attempt: 2
                });
                if (user) {
                    console.log('data save', user);
                    res.setHeader('Content-Type', 'application/json');
                    return res.status(201).json({ message: 'Data saved' });
                }
            } catch (error) {
                console.log("error" + error);
            }
        }
        else{
            return res.status(403).json({message:"Wrong Otp"});
        }
        
    }
    // static createDoc = async (req, res) => {
        
    //     console.log("in controller");
    //     // var dob2= new Date(req.body.dob);
    //     // var formattedDate = dob2.toLocaleDateString();
    //     // console.log(dob2)
    //     const hashpassword = await bcrypt.hash(req.body.password, 10);

    //     try {
    //         console.log(req.body);
    //         console.log(req.body.aadharNo);
            
    //         const olduser = await rsg.findOne({ aadharNo: req.body.aadharNo })
    //         console.log(olduser)
    //         console.log(olduser.attempt);

    //         // if (olduser.attempt == 0) {
    //             const user = rsg.create({
    //                 username: req.body.username,
    //                 phoneNo: req.body.phoneNo,
    //                 aadharNo: req.body.aadharNo,
    //                 dob: req.body.dob,
    //                 email: req.body.email,
    //                 password: hashpassword,
    //                 attempt: 2
    //             });
    //             if (user) {
    //                 console.log('data save', user);
    //                 res.setHeader('Content-Type', 'application/json');
    //                 return res.status(201).json({ message: 'Data saved' });
    //             }
    //         // } else {
    //         //     if (olduser.attempt > 0 && olduser.attempt < 4) {
    //         //         console.log("you have already register please upadte your documents")
    //         //         res.setHeader('Content-Type', 'application/json');
    //         //         return res.status(400).json({ message: 'Contact the admin' });
    //         //     } else {
    //         //         console.log("you have already register please upadte your documents")

    //         //     }
    //         // }

    //     } catch (error) {
    //         console.log("error" + error);
    //     }
    // }

    static documentRegistration = async (req, res) => {

        console.log("in documentRegistration");
        var aadharFile = req.files['aadharFile'][0].originalname;
        var incomeCertificate = req.files['incomeCertificate'][0].originalname;
        var fatherAadharcard = req.files['fatherAadharcard'][0].originalname;
        var marksheet = req.files['marksheet'][0].originalname;
        var latestMarksheet = req.files['latestMarksheet'][0].originalname;
        function generateNextEnrollmentID(lastEnrollmentID) {
            // Extract the last two digits from the enrollment ID and convert to a number
            const lastTwoDigits = parseInt(lastEnrollmentID.substr(6), 10);

            // Increment the last two digits
            const nextTwoDigits = lastTwoDigits + 1;

            // Format the new enrollment ID with leading zeros if necessary
            const newEnrollmentID = `ITEP09${nextTwoDigits.toString().padStart(2, '0')}`;

            return newEnrollmentID;
        }

        // Test the function

        var nextEnrollmentID = generateNextEnrollmentID(lastEnrollmentID);
        lastEnrollmentID = nextEnrollmentID;
        console.log(nextEnrollmentID); // Output: TEP0902

        try {

            const user = userDocument.create({
                userID: "04",
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
                return res.status(201).json({ message: 'Data saved',EnrollID:[0] });
            }
        } catch (error) {
            console.log("error" + error);
        }
    }



    // question file upload

   






    static loginCheck = async (request, response) => {
        try {
            const { email, password } = request.body;
            const role = "";
            const user = {};
            //  var checkuser={};
            const checkuser = await rsg.findOne({ email: email });
            console.log("chek   : " + checkuser)
            if (checkuser.email == email && checkuser.password == password) {
                user.role = "user";
                user.email = email;
                user.password = password;
                user.aadharFile = checkuser.aadharfile;
            }
            console.log("user :" + user)
            const payload = user;
            console.log("pppp :" + payload)
            const expiryTime = {
                expiresIn: '1d'
            }
            const token = jwt.sign(payload, SECRET_KEY, expiryTime);
            response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
            if (!token) {
                response.json({ message: "Error Occured while dealing with Token" });
            }
            response.redirect('/home1');
        } catch (err) {
            console.log("error : " + err);
        }
    }

    static authenticateJWT = (request, response, next) => {
        console.log("authenticateJWT : ");
        const token = request.cookies.jwt;
        if (!token) {
            response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
        }
        jwt.verify(token, SECRET_KEY, (err, payload) => {
            if (err)
                response.json({ message: "Error Occured while dealing with Token during verify" });
            request.payload = payload;
            next();
        });
    }

    static authorizeUser = (request, response, next) => {
        console.log("authorizeUser : ");
        console.log(request.payload.aadharFile)
        if (request.payload.role == "admin")
            response.render("admin");
        else if (request.payload.role == "user")
            response.render("home", { email: request.payload.email, aadharFile: request.payload.aadharFile });
        next();
    }

    static viewProfile = async (req, res) => {
        try {
            console.log(req.params.email)
            res.cookie('jwt', " ", { httpOnly: true, maxAge: 1 });

            res.render("home", { email: "", aadharFile: "" });
        } catch (error) {
            console.log(error)
        }

    }
}
export { RegistrationController, jwt };