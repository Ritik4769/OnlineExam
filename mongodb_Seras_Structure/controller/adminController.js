import { exam, rsg, shift, QuestionBank, questionPaper, interview, houseVisit1 } from '../modules/Registratio1.js';
import { adminLoginModel } from '../modules/adminModule.js';
import { placementRecords } from '../modules/adminAddPlacementRecord.js';
import { facultyRecords } from '../modules/addFaculty.js';
import { batchRecords } from '../modules/addBatch.js';
import { centerRecords } from '../modules/addCenter.js';
import { bannerRecords } from '../modules/addBanner.js'
import bcrypt from 'bcrypt';
import xlsx from 'xlsx';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

var secret_key = process.env.Admin_key;

//admin login
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
        console.log("Entry in else part password match");
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
  console.log("create shift inside");
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
  // next();
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
      console.log("candidateQuestionPaper already have: ", candidateQuestionPaper)
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
    var result = await rsg.updateOne({ _id: Id }, { $set: { examAllow: true } });
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
  }
  catch (error) {
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
  try {
    req.body.batchImage = req.files['batchImage'][0].originalname;
    await batchRecords.create(req.body);
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
  try {
    await centerRecords.create(req.body);
    res.status(201).json({ status: 'Center Adeed Sucessfully!!!!' });
  } catch (error) {
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
    const result = await bannerRecords.create(req.body);
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
    const interviewClear = await interview.insertMany(interviewsToSave);
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
    console.log("in housevisit : ")
    const houseVisit = await houseVisit1.find();
    console.log("house visit : ", houseVisit)
    res.json(houseVisit);
  } catch (err) {
    console.log("error : ", err);
  }
}

const getFacultiesController = async (req, res) => {
  try {
    var Faculties = await facultyRecords.find();
    console.log(Faculties);

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
    console.log(req.query);
    const deletedRes = await facultyRecords.deleteOne({ _id: req.query.id })
    const Records = await facultyRecords.find();
    res.status(201).json({ Records })
  } catch (error) {
    console.log("Error In deleting facutly", error);
    res.status(500).json({ message: "Error in deleting data" })
  }
}

const updateFacultuyController = async (req, res) => {
  console.log("hiihihihi");
  try {
    console.log(req.body);
    var image = '';
    if (typeof req.files['image'] != "undefined") {
      image = req.files['image'][0].originalname;
      req.body = { ...req.body, ["image"]: image };
    }

    var id = new Object(req.body._id);
    console.log(req.body._id);
    delete req.body._id;
    await facultyRecords.updateOne({ _id: id }, { $set: req.body });
    const faculty = await facultyRecords.find()
    res.status(201).json({ faculty, status: 'Faculty Updated Sucessfully!!!!' });
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

// function excelSerialNumberToJSDate(serial) {
//   const utcDays = Math.floor(serial - 25569);
//   const utcValue = utcDays * 86400;
//   const date = new Date(utcValue * 1000);
//   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//   return formattedDate;
// }

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
    const interviewClear = await houseVisit1.insertMany(interviewsToSave);
  } catch (err) {
    console.log("Error in interviews", err);
  }
}

const sendMessageController = async (req, res) => {
  const { message, array } = req.body;
  console.log("array", array);

  const enrollIDs = array.map(enrollment => enrollment.EnrollID);
  console.log("enrollIDs", enrollIDs);

  const usersWithEmails = await rsg.find({ 'EnrollID.enrollID': { $in: enrollIDs } }, 'email');

  const emails = usersWithEmails.map(user => user.email);

  const subject = 'InfoBeans Foundation';
  const body = message;

  console.log('Emails:', emails);
  sendMail(emails, subject, body);

}


// const sendResultMessageController = async (req, res) => {
//   const { message, resultArray } = req.body;
//   console.log("array", array);

//   const enrollIDs = array.map(email => enrollment.EnrollID);
//   console.log("enrollIDs", enrollIDs);

//   const usersWithEmails = await rsg.find({ 'EnrollID.enrollID': { $in: enrollIDs } }, 'email');

//   const emails = usersWithEmails.map(user => user.email);

//   const subject = 'InfoBeans Foundation';
//   const body = message;

//   console.log('Emails:', emails);
//   sendMail(emails, subject, body);

// }

function sendMail(emails, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrotradehelp@gmail.com",
      pass: "cldf skjh qtnq keyw",
    },
    secure: true,
  });

  emails.forEach(email => {
    const mailOptions = {
      from: 'agrotradehelp@gmail.com',
      to: email,
      subject: subject,
      text: String(body)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
  });
};

export { createExam, houseVisitShow, sendMessageController, updateFacultuyController, readExcelHomeController, uploadHomeFile, viewShiftNumber, deletePlacementRecord, createShift, uploadQuestionFile, readExcelController, getQuestionController, viewRegistrationCandidate, viewRegistrationCandidateDocument, allowUser, addPlacementRecord, viewplacementRecord, viewShiftRecord, addFacultyController, addBatchController, examControllerName, getTrainersController, getManagersController, addCenterController, getBatchDetailsControllers, addBannerController, getCentersController, readExcelInterviewController, interViewShow, uploadInterviewFile, getFacultiesController, searchFacultiesController, deleteFacultyController };
