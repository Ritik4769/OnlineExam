import { exam, rsg, shift, QuestionBank, questionPaper, interview, houseVisit1 } from '../modules/Registration.js';
import { adminLoginModel } from '../modules/adminModule.js';
import { placementRecords } from '../modules/adminAddPlacementRecord.js';
import { facultyRecords } from '../modules/addFaculty.js';
import { batchRecords } from '../modules/addBatch.js';
import { centerRecords } from '../modules/addCenter.js';
import { bannerRecords } from '../modules/addBanner.js'
import { CompanyRecords } from '../modules/addCompany.js';
import { gallery } from '../modules/addGallery.js'
import bcrypt from 'bcrypt';
import xlsx from 'xlsx';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import { transporter } from '../modules/emailModule.js';
import randomstring from 'randomstring';

var secret_key = process.env.Admin_key;
var otp="";

export const adminLoginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const adminInfo = await adminLoginModel.findOne({ email: email });
    if (adminInfo == null) {
      return response.status(202).json({ message: 'Invalid Email Id ' });
    }
    else {
      const hashpassword = await bcrypt.compare(password, adminInfo.password);
      if (hashpassword) {
        const token = jwt.sign({ adminInfo: email }, secret_key, { expiresIn: "1d" });
        return response.status(201).json({ message: 'login successfull', token: token });
      }
      else {
        return response.status(203).json({ message: 'incorrect password' });
      }
    }
  } catch (err) {
    console.log("technical issue in admin logi controller catch :", err);
    return response.status(204).json({ message: 'technical issue' });
  }
}

export const verifyAdmin = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(202).json({ error: 'Token is not provided' });
  }
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(202).json({ error: 'Invalid token' });
    }
    return res.status(201).json({ error: 'verified Admin' });
    req.user = decoded;
  })
}

const createExam = async (req, res) => {
  try {
    const { examTitle, examDate, examDuration } = req.body;
    const newExam = new exam({
      examTitle,
      examDate,
      examDuration
    });
    const savedExam = await newExam.save();
    if (savedExam) {
      return res.status(201).json({ newExam: newExam });
    } else {
      return res.status(202).json({ newExam: "" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the exam.' });
  }
};

const createShift = async (req, res) => {
  try {
    const { shiftNumber, shiftTimeFrom, shiftTimeTo, examVenue } = req.body;
    let { maxCandidates, exam } = req.body;
    const examid = exam;
    let lastCandidateValue;
    var EnrollidArr = [];

    if (shiftNumber > 1) {
      const shift1 = shiftNumber - 1;
      const result = await shift.findOne({
        shiftNumber: shift1,
        exam: examid,
        enrolledCandidates: { $elemMatch: { EnrollID: { $exists: true } }, $not: { $size: 0 } }
      });
      if (result) {
        const enrolledCandidates = result.enrolledCandidates;
        if (enrolledCandidates.length > 0) {
          const lastCandidate = enrolledCandidates[enrolledCandidates.length - 1];
          lastCandidateValue = lastCandidate.EnrollID;
        } else {
          console.log('No candidates in the array.');
        }
      } else {
        console.log('No matching document found.');
      }
      const enrollid = await rsg.find({ 'EnrollID.enrollID': { $gt: lastCandidateValue } });
      if (maxCandidates > enrollid.length) {
        maxCandidates = enrollid.length;
      }
      for (var i = 0; i < maxCandidates; i++) {
        var obj = {};
        var enarr = enrollid[i].EnrollID.length - 1;
        obj.EnrollID = enrollid[i].EnrollID[enarr].enrollID;
        EnrollidArr[i] = obj;
      }

      const newShift = new shift({
        shiftNumber,
        maxCandidates,
        shiftTimeFrom,
        shiftTimeTo,
        examVenue,
        exam: examid,
        enrolledCandidates: EnrollidArr
      });
      const savedShift = await newShift.save();
      res.status(201).json(savedShift);
    } else {
      const enrollid = await rsg.find();
      if (maxCandidates > enrollid.length) {
        maxCandidates = enrollid.length;
      }
      for (var i = 0; i < maxCandidates; i++) {
        var obj = {};
        var enarr = enrollid[i].EnrollID.length - 1;
        obj.EnrollID = enrollid[i].EnrollID[enarr].enrollID;
        EnrollidArr[i] = obj;
      }
      const newShift = new shift({
        shiftNumber,
        maxCandidates,
        shiftTimeFrom,
        shiftTimeTo,
        examVenue,
        exam: examid,
        enrolledCandidates: EnrollidArr
      });
      const savedShift = await newShift.save();
      res.status(201).json(savedShift);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create the shift.' });
  }
};

var questionFile;

const uploadQuestionFile = async (req, res, next) => {
  questionFile = req.files['questionFile'][0].originalname;
  next();
}

const createOrUpdateQuestions = async (subjectID, questions) => {
  try {
    const existingRecord = await QuestionBank.findOne({ SubjectID: subjectID });
    if (existingRecord) {
      const existingQuestions = existingRecord.questions;
      for (const newQuestion of questions) {
        const isDuplicate = existingQuestions.some(existingQuestion => {
          return (
            newQuestion.Question === existingQuestion.Question &&
            newQuestion.OptionA === existingQuestion.OptionA &&
            newQuestion.OptionB === existingQuestion.OptionB &&
            newQuestion.OptionC === existingQuestion.OptionC &&
            newQuestion.OptionD === existingQuestion.OptionD &&
            newQuestion.Answer === existingQuestion.Answer
          );
        });

        if (!isDuplicate) {
          existingQuestions.push(newQuestion);
        }
      }
      existingRecord.questions = existingQuestions;
      await existingRecord.save();
    } else {
      await QuestionBank.create({
        SubjectID: subjectID,
        questions,
      });
    }
  } catch (err) {
    console.log('Something went wrong:', err);
  }
};

const readExcelController = async (req, res, next) => {
  const workbook = xlsx.readFile('./uploads/' + questionFile);
  const workbook_sheet = workbook.SheetNames;
  const workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);
  const subjectQuestions = {};

  workbook_response.forEach(element => {
    const subjectID = element.SubjectID;
    if (!subjectQuestions[subjectID]) {
      subjectQuestions[subjectID] = [];
    }

    const question = {
      QuestionID: element.QuestionID,
      Question: element.Question,
      OptionA: element.OptionA,
      OptionB: element.OptionB,
      OptionC: element.OptionC,
      OptionD: element.OptionD,
      Answer: element.Answer,
    };

    const isDuplicate = subjectQuestions[subjectID].some(existingQuestion => {
      return (
        question.Question === existingQuestion.Question &&
        question.OptionA === existingQuestion.OptionA &&
        question.OptionB === existingQuestion.OptionB &&
        question.OptionC === existingQuestion.OptionC &&
        question.OptionD === existingQuestion.OptionD &&
        question.Answer === existingQuestion.Answer
      );
    });

    if (!isDuplicate) {
      subjectQuestions[subjectID].push(question);
    }
  });

  const promises = [];

  for (const subjectID in subjectQuestions) {
    promises.push(createOrUpdateQuestions(subjectID, subjectQuestions[subjectID]));
  }

  await Promise.all(promises);

  const existingRecord1 = await QuestionBank.find();
  res.status(200).send(existingRecord1);
}

const getQuestionController = async (req, res) => {
  try {
    var enrollID = req.body.EnrollId;
    const subjectIDs = ["ENG01", "HIN02", "MAT03", "REAS04", "COM05", "GK06"];
    const selectedQuestionsBySubject = [];
    var counter = 0;
    const candidateQuestionPaper = await questionPaper.findOne({ 'EnrollID': enrollID })
    if (candidateQuestionPaper == null) {
      for (const subjectID of subjectIDs) {
        const questions = await QuestionBank.findOne({ SubjectID: subjectID });
        if (questions && questions.questions) {
          const subjectQuestions = questions.questions;
          // Using Fisher-Yates algorithm for Random Questions
          for (let i = subjectQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [subjectQuestions[i], subjectQuestions[j]] = [subjectQuestions[j], subjectQuestions[i]];
          }
          const selectedQuestionsFromSubject = subjectQuestions.slice(0, 10);
          // let selectedQuestionsFromSubject;
          // if (subjectIDs === "ENG01" || subjectIDs === "HIN02") {
          //   selectedQuestionsFromSubject = subjectQuestions.slice(0, 10);
          // } else if (subjectIDs === "COM05" || subjectIDs === "GK06") {
          //   selectedQuestionsFromSubject = subjectQuestions.slice(0, 15);
          // } else {
          //   selectedQuestionsFromSubject = subjectQuestions.slice(0, 25);
          // }
          for (var question of selectedQuestionsFromSubject) {
            question.QuestionID = ++counter;
            question.selectedAnswer = "";
            question.answerColor = "light";
          }
          selectedQuestionsBySubject.push({ subjectID, questions: selectedQuestionsFromSubject });
        }
      }
      var obj = {
        EnrollID: enrollID,
        paper: selectedQuestionsBySubject,
      }
      const newQuestionPaper = new questionPaper(obj);
      await newQuestionPaper.save();
      return res.status(201).json({ QuestionPaperObject: obj });
    } else {
      return res.status(201).json({ QuestionPaperObject: candidateQuestionPaper });
    }
  } catch (err) {
    console.log('Something went wrong:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const viewRegistrationCandidate = async (req, res) => {
  try {
    var candidateData = await rsg.find();
    res.json(candidateData);
  } catch (err) {
    console.log('Something went wrong:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const viewRegistrationCandidateDocument = async (req, res) => {
  try {
    var userId = req.params.userId;
    var candidateDocument = await rsg.findOne({ _id: userId });
    res.json(candidateDocument);
  } catch (err) {
    console.log('Something went wrong:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const allowUser = async (req, res) => {
  var Id = req.params.userId;
  try {
    await rsg.updateOne({ _id: Id }, { $set: { examAllow: true } });
  } catch (error) {
    console.log("Error while Allow user for 4th attempt : ", error);
  }
}

const addPlacementRecord = async (req, res) => {
  const { studentName, studentNumber, studentEmail, studentCompanyName, studentJoiningDate, studentBatchNumber, studentBatchSession, studentPackage, studentImage } = req.body;
  var studentImage2 = req.files['studentImage'][0].originalname
  const studentRecord = {
    studentname: studentName,
    studentnumber: studentNumber,
    studentemail: studentEmail,
    studentcompanyname: studentCompanyName,
    studentjoiningdate: studentJoiningDate,
    studentbatchnumber: studentBatchNumber,
    studentbatchsession: studentBatchSession,
    studentpackage: studentPackage,
    studentimage: studentImage2
  }
  try {
    const result = await placementRecords.create(studentRecord);
    const data = await placementRecords.find();
    res.status(201).json({ data: 'data added' });
  } catch (err) {
    console.log("error : ", err);
  }
}

const viewplacementRecord = async (req, res) => {
  try {
    const placedRecord = await placementRecords.find();
    res.json(placedRecord);
  } catch (err) {
    console.log("error : ", err);
  }
}

const viewShiftRecord = async (req, res) => {
  try {
    var CandidateData = [];
    const shifts = await shift.find();
    for (var i = 0; i < shifts.length; i++) {
      for (var j = 0; j < shifts[i].enrolledCandidates.length; j++) {
        var enrollIDToFind = shifts[i].enrolledCandidates[j].EnrollID;
        const data = await rsg.findOne({ EnrollID: { $elemMatch: { enrollID: enrollIDToFind } } });
        var shiftNumber = shifts[i].shiftNumber;
        var userData = { ...data, shiftNumber: shiftNumber, EnrollId: enrollIDToFind };
        CandidateData = [...CandidateData, userData];
      }
    }
    res.json(CandidateData)
  } catch (error) {
    console.error(error);
  }
};

const deletePlacementRecord = async (req, res) => {
  try {
    await placementRecords.deleteOne({ _id: req.params.userId });
  } catch (error) {
    console.log("error : ", error);
  }
}

const viewShiftNumber = async (req, res) => {
  try {
    const shiftNumber = await shift.find();
    res.json(shiftNumber);
  } catch (err) {
    console.log("error : ", err);
  }

}

const addFacultyController = async (req, res) => {
  try {
    var image = '';
    image = req.files['image'][0].originalname;
    req.body = { ...req.body, ["image"]: image };
    await facultyRecords.create(req.body);
    const Faculties = await facultyRecords.find()
    res.status(201).json({ status: 'Faculty Adeed Sucessfully!!!!', Faculties });
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({ status: 'Error!!! while Adding Faculty' });
  }
}

const addBatchController = async (req, res) => {
  console.log(req.body);
  try {
    req.body.batchImage = req.files['batchImage'][0].originalname;
    await batchRecords.create(req.body);
    const Batch = await batchRecords.find()
    res.status(201).json({ status: 'Batch Adeed Sucessfully!!!!' });
  } catch (error) {
    res.status(500).json({ status: 'Error!!! while Adding Batch' });
  }
}

const examControllerName = async (req, res) => {
  try {
    const Exam = await exam.find();
    res.json(Exam);
  } catch (err) {
    console.log("error : ", err);
  }
}

const getTrainersController = async (req, res) => {
  try {
    const Trainers = await facultyRecords.find({ department: "Trainer" });
    res.status(201).json(Trainers)
  } catch (error) {
    console.log("Error in getting Triners", error);
    res.status(500).json({ status: 'Error!!! while  getting Trianers Data' });
  }
}

const getManagersController = async (req, res) => {
  try {
    const Managers = await facultyRecords.find({ department: "Management" });
    res.status(201).json(Managers)
  } catch (error) {
    console.log("Error in getting Triners", error);
    res.status(500).json({ status: 'Error!!! while  getting Trianers Data' });
  }
}

const addCenterController = async (req, res) => {
  req.body.centerImage = req.files['centerImage'][0].originalname;
  console.log(req.body);
  try {
    var result = await centerRecords.create(req.body);
    console.log("res: ", result);
    res.status(201).json({ status: 'Center Adeed Sucessfully!!!!' });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ status: 'Error!!! while Adding New Center' });
  }
}

const getBatchDetailsControllers = async (req, res) => {
  try {
    const Batchs = await batchRecords.find();
    res.json(Batchs)
  } catch (error) {
    console.log("Error In getting Batch Detials For Main page", error);
  }
}

const addBannerController = async (req, res) => {
  req.body.bannerImg = req.files['bannerImg'][0].originalname;
  try {
    await bannerRecords.create(req.body);
    res.status(201).json({ status: 'Banner Adeed Sucessfully!!!!' });
  } catch (error) {
    console.log("Error In UpLoading Banner", error);
    res.status(500).json({ status: 'Error!!! while Adding Banner' });
  }
}

const getCentersController = async (req, res) => {
  try {
    const Centers = await centerRecords.find();
    res.status(201).json(Centers)
  } catch (error) {
    console.log("Error in getting Centers", error);
    res.status(500).json({ status: 'Error!!! while Getting Centers' })
  }
}

var interviewFile;

const uploadInterviewFile = async (req, res, next) => {
  interviewFile = req.files['interviewFile'][0].originalname;
  next();
}

function excelSerialNumberToJSDate(serial) {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const date = new Date(utcValue * 1000);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
}

const readExcelInterviewController = async (req, res, next) => {
  const workbook = xlsx.readFile('./uploads/' + interviewFile);
  const workbook_sheet = workbook.SheetNames;
  const workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);
  const interviewsToSave = workbook_response.map(data => {
    return new interview({
      EnrollID: data.EnrollID,
      status: data.status,
      feedback: data.feedback,
      name: data.name,
      marks: data.marks,
      curDate: excelSerialNumberToJSDate(data.curDate),
      interviewDate: excelSerialNumberToJSDate(data.interviewDate)
    });
  });

  try {
    await interview.insertMany(interviewsToSave);
  } catch (err) {
    console.log("Error in interviews", err);
  }
}

const interViewShow = async (req, res) => {
  try {
    const interviewData = await interview.find()
    res.json(interviewData);
  } catch (err) {
    console.log("error : ", err);
  }
}

const houseVisitShow = async (req, res) => {
  try {
    const houseVisit = await houseVisit1.find();
    res.json(houseVisit);
  } catch (err) {
    console.log("error : ", err);
  }
}

const getFacultiesController = async (req, res) => {
  try {
    var Faculties = await facultyRecords.find();
    res.status(201).json(Faculties)
  } catch (error) {
    console.log("Error In getiing Faculties Data", error);
    res.status(500).json({ "Message": "Error In getiing Faculties Data" })
  }
}

const searchFacultiesController = async (req, res) => {
  try {
    const searchTerm = req.query.Searchdata
    const result = await facultyRecords.find({ facultyname: { $regex: new RegExp(searchTerm, 'i') } });
    res.status(201).json(result);
  } catch (error) {
    console.log("Eroor in Searchin faculty data", error);
    res.status(500).json(result);
  }
}

const deleteFacultyController = async (req, res) => {
  try {
    const deletedRes = await facultyRecords.deleteOne({ _id: req.query.id })
    const Records = await facultyRecords.find();
    res.status(201).json({ Records })
  } catch (error) {
    console.log("Error In deleting facutly", error);
    res.status(500).json({ message: "Error in deleting data" })
  }
}
const deleteBatchController = async (req, res) => {
  try {
    const deletedRes = await batchRecords.deleteOne({ _id: req.query._id })
    const Records = await batchRecords.find();
    res.status(201).json({ Records })
  } catch (error) {
    console.log("Error In deleting facutly", error);
    res.status(500).json({ message: "Error in deleting data" })
  }
}
const deleteCompanyController = async (req, res) => {
  try {
    const deletedRes = await CompanyRecords.deleteOne({ _id: req.query._id })
    const company = await CompanyRecords.find();
    res.status(201).json({ company })
  } catch (error) {
    console.log("Error In deleting facutly", error);
    res.status(500).json({ message: "Error in deleting data" })
  }
}

const updateFacultuyController = async (req, res) => {
  try {
    var image = '';
    if (typeof req.files['image'] != "undefined") {
      image = req.files['image'][0].originalname;
      req.body = { ...req.body, ["image"]: image };
    }

    var id = new Object(req.body._id);
    delete req.body._id;
    await facultyRecords.updateOne({ _id: id }, { $set: req.body });
    const faculty = await facultyRecords.find()
    res.status(201).json({ faculty, status: 'Faculty Updated Sucessfully!!!!' });
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({ status: 'Error!!! while Updating Faculty' });
  }
}
const updateBatchController = async (req, res) => {
  try {
    var image = '';
    if (typeof req.files['batchImage'] != "undefined") {
      image = req.files['batchImage'][0].originalname;
      req.body = { ...req.body, ["batchImage"]: image };
    }
    var id = new Object(req.body._id);
    delete req.body._id;
    var result = await batchRecords.updateOne({ _id: id }, { $set: req.body });
    const batch = await batchRecords.find()
    res.status(201).json({ batch, status: 'Batch Updated Sucessfully!!!!' });
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({ status: 'Error!!! while Updating Faculty' });
  }
}
const updateCompanyController = async (req, res) => {
  try {
    var image = '';
    if (typeof req.files['companyImg'] != "undefined") {
      image = req.files['companyImg'][0].originalname;
      req.body = { ...req.body, ["companyImg"]: image };
    }
    var id = new Object(req.body._id);
    delete req.body._id;
    var result = await CompanyRecords.updateOne({ _id: id }, { $set: req.body });
    const company = await CompanyRecords.find()
    res.status(201).json({ company, status: 'Batch Updated Sucessfully!!!!' });
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({ status: 'Error!!! while Updating Faculty' });
  }
}

var homeFile;
const uploadHomeFile = async (req, res, next) => {
  homeFile = req.files['homeFile'][0].originalname;
  next();
}

const readExcelHomeController = async (req, res, next) => {
  const workbook = xlsx.readFile('./uploads/' + homeFile);
  const workbook_sheet = workbook.SheetNames;
  const workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);
  const interviewsToSave = workbook_response.map(data => {
    return new houseVisit1({
      EnrollID: data.EnrollID,
      status: data.status,
      feedback: data.feedback,
      name: data.name,
      marks: data.marks,
      curDate: excelSerialNumberToJSDate(data.curDate),
      interviewDate: excelSerialNumberToJSDate(data.interviewDate)
    });
  });

  try {
    await houseVisit1.insertMany(interviewsToSave);
  } catch (err) {
    console.log("Error in interviews", err);
  }
}

const sendMessageController = async (req, res) => {
  const { message, array } = req.body;
  const enrollIDs = array.map(enrollment => enrollment.EnrollID);
  const usersWithEmails = await rsg.find({ 'EnrollID.enrollID': { $in: enrollIDs } }, 'email');
  const emails = usersWithEmails.map(user => user.email);
  const subject = 'InfoBeans Foundation';
  const body = message;
  sendMail(emails, subject, body);
}

const sendResultMessageController = async (req, res) => {
  const { message, resultArray } = req.body;
  const subject = 'InfoBeans Foundation';
  const body = message;
  sendMail(resultArray, subject, body);
}

const sendSingleMessageController = async (req, res) => {
  const { enrollID, messages } = req.body;
  const usersWithEmails = await rsg.findOne({ 'EnrollID.enrollID': { $in: enrollID } });
  var email = usersWithEmails.email;
  var mailoption = {
    from: "dabidipesh7898@gmail.com",
    to: email,
    subject: `Infobeans Foundation ITEP Program`,
    text: String(messages)
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
}

const sendOneMessageController = async (req, res) => {
  const { email, messages } = req.body;
  var mailoption = {
    from: "dabidipesh7898@gmail.com",
    to: email,
    subject: `Infobeans Foundation ITEP Program`,
    text: String(messages)
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
}

function sendMail(emails, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dabidipesh7898@gmail.com",
      pass: "dhck hnag hpvu jpzc",
    },
    secure: true,
  });

  emails.forEach(email => {
    const mailOptions = {
      from: 'dabidipesh7898@gmail.com',
      to: email,
      subject: subject,
      text: String(body.message)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', mailOptions.to);
      }
    });
  });
};

const getBannerdetailsController = async (req, res) => {
  try {
    var banners = await bannerRecords.find();
    res.status(201).json(banners)
  } catch (error) {
    console.log("Error In getiing Banners Data", error);
    res.status(500).json({ "Message": "Error In getiing Banners Data" })
  }
}

const EndTestByAdminController = async (req, res) => {
  try {
    const shiftData = req.body;
    for (let index in shiftData) {
      await rsg.updateOne(
        { "EnrollID.enrollID": shiftData[index].EnrollId },
        { $set: { "EnrollID.$.score": 0, "EnrollID.$.RemainingTime": 90, "EnrollID.$.Attendance": "Absent", "EnrollID.$.Allowance": "Allowed" } }
      );
      await questionPaper.deleteOne({ EnrollID: shiftData[index].EnrollId })
    }
    res.status(200).json({ message: "All candidates result will reset successfully" })
  } catch (error) {
    console.log("Error In getiing shift data in End Tesst---", error);
    res.status(500).json({ message: "Error In update candidate score or time" })
  }
}

const GenerateResultByAdminController = async (req, res) => {
  try {
    const shiftData = req.body;
    for (let index in shiftData) {
      let CandidateData = await rsg.findOne({ "EnrollID.enrollID": shiftData[index].EnrollId });
      if (CandidateData.EnrollID[CandidateData.EnrollID.length - 1].score > 0 && CandidateData.EnrollID[CandidateData.EnrollID.length - 1].RemainingTime < 90) {
        continue;
      }
      var score = 0;
      var QuestionPaperObject = await questionPaper.findOne({ EnrollID: shiftData[index].EnrollId })
      if (QuestionPaperObject == null) {
        continue;
      }
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
        { "EnrollID.enrollID": shiftData[index].EnrollId },
        { $set: { "EnrollID.$.score": score } }

      );
      score = 0;
    }
    res.status(201).json({ message: "All Candidates Result generated successfully" });
  } catch (err) {
    console.log("Error occure when result generate by admin in adminController : ", err)
    res.status(203).json({ message: "Some Technical issue" });
  }
}

const AllowCandidate = async (req, res) => {
  const EnrollId = req.body.Enrollid;
  await rsg.updateOne(
    { "EnrollID.enrollID": EnrollId },
    { $set: { "EnrollID.$.Allowance": "Allowed" } }
  );
  res.status(201).json({ message: "Allow Successfully" });
}

const addCompanyController = async (req, res) => {
  req.body.companyImg = req.files['companyImg'][0].originalname;
  try {
    await CompanyRecords.create(req.body);
    var comapny = await CompanyRecords.find()
    res.status(201).json({ comapny:comapny, status: 'Company Adeed Sucessfully!!!!' });
  } catch (error) {
    console.log("Error In UpLoading Company", error);
    res.status(500).json({ status: 'Error!!! while Adding Company' });
  }
}

const getCompaniesController = async (req, res) => {
  try {
    const result = await CompanyRecords.find();
    console.log("companyies : ",result);
    res.status(201).json({ companies: result, status: 'Company Adeed Sucessfully!!!!' });
  } catch (error) {
    console.log("Error In Getting Company", error);
    res.status(500).json({ status: 'Error!!! while Getting Companies' });
  }
}

const getAchivementsController = async (req, res) => {
  try {
    var achivments = {};
    const compainesnum = await CompanyRecords.find();
    achivments = { ["compainesnum"]: compainesnum.length }
    const placementnum = await placementRecords.find();
    achivments = { ...achivments, ["placementnum"]: placementnum.length }
    res.status(201).json({ achivments });
  } catch (error) {
    console.log("Error in getting achivemnts", error);
  }
}

const getBannerData = async(req,res)=>{
  try{
      const data= await bannerRecords.find();
      res.status(201).json({bannerdata:data});
  }catch(error){
    console.log("error while fetching data",error);
    res.status(500).json({message:"error"});
  }
}

const deleteBanner = async(req,res,next)=>{
    try{
        const id=req.body.id;
        const result= await bannerRecords.deleteOne({_id:id});
        if(result.acknowledged){
          next();
        }
        else{
          res.status(203).json({message:'erro'});
        }
    }catch(error){
      console.log("error ",error);
      res.status(500).json({message:'error'});
    }
}

const updateBanner = async(req,res,next)=>{
  req.body.bannerImg = req.files['bannerImg'][0].originalname;
  try {
    const update=await bannerRecords.updateOne({_id:req.body._id},
      {
        $set:{
          bannerName:req.body.bannerName,
          bannerImg:req.body.bannerImg
        }
      }
      )
      console.log('update : ',update);
      if(update.acknowledged){
         next();
      }
      else{
        res.status(203).json({message:'update unsuccess full'})
      }
  } catch (error) {
    console.log("Error In UpLoading Banner", error);
    res.status(500).json({ status: 'Error!!! while Adding Banner' });
  }
}

const getCenterData = async(req,res)=>{
    try{
       const data=await centerRecords.find();
       console.log('center Data : ',data);
       res.status(201).json({centerdata:data});
    }catch(error){
      console.log('error ',error);
      res.status(500).json({message:'error'});
    }
}

const deleteCenter = async(req,res,next)=>{
    try{
       const result = await centerRecords.deleteOne({_id:req.body.id})
       if(result.acknowledged){
        next();
       }
       else{
        res.status(203).json({message:'Error while deleting'});
       }
    }catch(error){
      console.log('error : ',error);
      res.status(500).json({message:'error'});
    }

}

const updateCenter = async(req,res,next)=>{
  req.body.centerImage = req.files['centerImage'][0].originalname;
  try {
    var result = await centerRecords.updateOne({_id:req.body._id},{
        $set:{
          centerName:req.body.centerName,
          managerName:req.body.managerName,
          centerImage:req.body.centerImage,
          address:req.body.address,
          startDate:req.body.startDate  
        }
    });
    console.log('result ',result);
    if(result.acknowledged){
      next();
    }
    else {
      res.status(201).json({message:'Error when update Center'});
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ status: 'Error!!! while Adding New Center' });
  }
}




const addGalleryDataController = async (req, res) => {
  req.body.galleryImg = req.files['galleryImg'][0].originalname;
  console.log("inside  addGalleryCenterController");
  console.log("req.body :", req.body);
  try {
    await gallery.create(req.body);
    console.log("photo added successfully celebration");
    res.status(201).json({ status: 'Photo Added Sucessfully!!!!' });
  } catch (error) {
    console.log("Error In UpLoading Photo", error);
    res.status(500).json({ status: 'Error!!! while Adding Photo' });
  }
}


const getSliderDataController = async (req, res) => {
  const category =  req.params.category;
  console.log("inside  getSliderDataController");
  console.log("category" ,category);
  try {
    var banners = await gallery.find({category : category});
    res.status(201).json(banners)
  } catch (error) {
    console.log("Error In getiing Banners Data", error);
    res.status(500).json({ "Message": "Error In getiing Banners Data" })
  }
}

const getGalleryDataController = async (req, res) => {
  console.log("inside  getGalleryDataController");
  try {
    var banners = await gallery.find();
    res.status(201).json(banners)
  } catch (error) {
    console.log("Error In getiing Banners Data", error);
    res.status(500).json({ "Message": "Error In getiing Banners Data" })
  }
}


const deleteGalleryController = async (req, res) => {
  console.log("inside  getGalleryDataController");

  try {
    const deletedRes = await gallery.deleteOne({ _id: req.query.id })
    const Records = await gallery.find();
    res.status(201).json({ Records })
  } catch (error) {
    console.log("Error In deleting facutly", error);
    res.status(500).json({ message: "Error in deleting data" })
  }
}

const updateGalleryController = async (req, res) => {
  console.log("inside  getGalleryDataController");



  try {
    var image = '';
    if (typeof req.files['galleryImg'] != "undefined") {
      image = req.files['galleryImg'][0].originalname;
      req.body = { ...req.body, ["galleryImg"]: image };
    }

    var id = new Object(req.body._id);
    delete req.body._id;
    await gallery.updateOne({ _id: id }, { $set: req.body });
    const faculty = await gallery.find()
    res.status(201).json({ faculty, status: 'Faculty Updated Sucessfully!!!!' });
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({ status: 'Error!!! while Updating Faculty' });
  }

}

const verifyAdminEmailController = async (req, res) => {
  const email = req.body.email;
  const adminData = await adminLoginModel.findOne({ email: email });
  if (adminData) {
    otp = randomstring.generate({
      length: 4,
      charset: 'numeric'
    });
    console.log('otp : ', otp);
    var mailoption = {
      from: "dabidipesh7898@gmail.com",
      to: email,
      subject: `Infobeans Foundation ITEP Program`,
      text: `Hello ${email} your one time password is ${otp}`
    };
    transporter.sendMail(mailoption, (error, info) => {
      if (info) {
        console.log('Email sent');
        return res.status(201).json({ message: "Otp Sent to your mail Id please check" });
      } else {
        console.log('email not sent');
        return res.status(404).json({ mesaage: "Otp not sent some technical issue" });
      }
    });
  }
  else {
    res.status(203).json({ message: "Invalid Email" });
  }
}

const verifyOtpController = async (req, res) => {
  try {
    const userOtp = req.body.userOtp;
    console.log("otp-->",otp+"typeOf"+typeof otp);
    console.log("user otp-->",userOtp+"typeOf"+typeof userOtp);
    console.log("matching otp-->", otp == userOtp);
    if (otp == userOtp) {
      res.status(201).json({ message: "Otp Match successfully" });
    }
    else {
      res.status(203).json({ message: "Otp Not Match" });
    }
  } catch (err) {
    console.log(err);
  }
}
const forgotPasswordController = async (req, res) => {
  console.log("req.body in forgotPasswordController===", req.body);
  const { newPassword, confirmPassword, email } = req.body;
  if (newPassword !== confirmPassword) {
    res.status(208).json({ message: "new password or confirm password does not match !" })
  }
  const hashPassword = await bcrypt.hash(confirmPassword, 10)

  const adminData = await adminLoginModel.updateOne({ email: email }, { $set: { password: hashPassword } });
  console.log("---->", adminData);
  if (adminData.acknowledged === true) {
    res.status(201).json({ message: "password updated successfully" });
  }
  else {
    res.status(203).json({ message: "password not update some technical issue" });
  }
}



export { deleteCompanyController, updateCompanyController, deleteBatchController, 
  updateBatchController, sendOneMessageController, sendSingleMessageController, 
  sendResultMessageController, GenerateResultByAdminController, EndTestByAdminController,
   AllowCandidate, createExam, houseVisitShow, sendMessageController, updateFacultuyController, 
   readExcelHomeController, uploadHomeFile, viewShiftNumber, deletePlacementRecord, 
   createShift, uploadQuestionFile, readExcelController, getQuestionController, 
   viewRegistrationCandidate, viewRegistrationCandidateDocument, allowUser, 
   addPlacementRecord, viewplacementRecord, viewShiftRecord, addFacultyController, 
   addBatchController, examControllerName, getTrainersController, getManagersController,
  addCenterController, getBatchDetailsControllers, addBannerController, getCentersController, 
  readExcelInterviewController, interViewShow, uploadInterviewFile, getFacultiesController, 
  searchFacultiesController, deleteFacultyController, getBannerdetailsController,
   addCompanyController, getCompaniesController, getAchivementsController,getBannerData,deleteBanner,updateBanner,
   getCenterData,deleteCenter,updateCenter , addGalleryDataController , getSliderDataController , getGalleryDataController , deleteGalleryController ,updateGalleryController, verifyAdminEmailController, forgotPasswordController, verifyOtpController};