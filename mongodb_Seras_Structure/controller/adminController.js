// controllers/examController.js
import { rsg, userDocument, exam, shift, QuestionBank } from '../modules/Registration.js';
import xlsx from 'xlsx';
let workbook_response;
var secret_key = process.env.Admin_key;

// Create a new exam
const createExam = async (req, res) => {

  console.log("admin controller");
  try {

    const { examTitle, examDate, examDuration, examVenue } = req.body;
    const newExam = new exam({
      examTitle,
      examDate,
      examDuration,
      examVenue
    });
    const savedExam = await newExam.save();

    const enrollid = await userDocument.find();

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


  console.log("creatshift inside");
  try {
    const { shiftNumber, shiftTimeFrom, shiftTimeTo } = req.body;
    let { maxCandidates } = req.body;
    const examid = req.params.examid;

    let lastCandidateValue; // Declare the variable outside the function
    if (shiftNumber > 1) {
      const shift1 = shiftNumber - 1;
      await shift.findOne({
        shiftNumber: shift1,
        exam: examid,
        enrolledCandidates: { $elemMatch: { EnrollID: { $exists: true } }, $not: { $size: 0 } }
      })
        .exec()
        .then(result => {
          if (result) {
            const enrolledCandidates = result.enrolledCandidates;
            if (enrolledCandidates.length > 0) {
              const lastCandidate = enrolledCandidates[enrolledCandidates.length - 1];
              lastCandidateValue = lastCandidate.EnrollID;

              console.log('Last enrolled candidate:', lastCandidateValue);
            } else {
              console.log('No candidates in the array.');
            }
          } else {
            console.log('No matching document found.');
          }
        })
        .catch(err => {
          console.error('Error:', err);
        });


      const enrollid = await userDocument.find({ EnrollID: { $gt: lastCandidateValue } });
      console.log("enroll id : ", enrollid);
      if (maxCandidates > enrollid.length) {
        maxCandidates = enrollid.length;
      }
      var EnrollidArr = [];

      for (var i = 0; i < maxCandidates; i++) {
        var obj = {};
        obj.EnrollID = enrollid[i].EnrollID;
        EnrollidArr[i] = obj
        console.log("Enroll id : ", EnrollidArr[i]);
      }
      const enrolledCandidates = EnrollidArr;
      const newShift = new shift({
        shiftNumber,
        maxCandidates,
        shiftTimeFrom,
        shiftTimeTo,
        exam: examid, // Reference to the parent exam
        enrolledCandidates// Array of candidate enrollment IDs
      });
      const savedShift = await newShift.save();
      res.status(201).json(savedShift);
    }
    else {
      const enrollid = await userDocument.find();
      console.log("enroll id : ", enrollid);
      if (maxCandidates > enrollid.length) {
        maxCandidates = enrollid.length;
      }
      var EnrollidArr = [];

      for (var i = 0; i < maxCandidates; i++) {
        var obj = {};
        obj.EnrollID = enrollid[i].EnrollID;
        EnrollidArr[i] = obj;

        console.log("in loop")
        console.log("Enroll id : ", EnrollidArr[i]);
      }

      const enrolledCandidates = EnrollidArr;
      console.log("enrolledCandidates : ", enrolledCandidates)
      const newShift = new shift({
        shiftNumber,
        maxCandidates,
        shiftTimeFrom,
        shiftTimeTo,
        exam: examid, // Reference to the parent exam
        enrolledCandidates// Array of candidate enrollment IDs
      });
      const savedShift = await newShift.save();
      console.log(savedShift);
      res.status(201).json(savedShift);
    }

  } catch (error) {
    // console.error(error);
    console.log(error);
    res.status(500).json({ error: 'Failed to create the shift.' });
  }
};

var questionFile;

const uploadQuestionFile = async (req, res, next) => {
  console.log("in uploadQuestionFile");
  questionFile = req.files['questionFile'][0].originalname;
  console.log(questionFile);
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
      Answer: element.Answer
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

  next();
}

const getQuestionController = async (req, res) => {
  try {
    var enrollID = req.body.EnrollId;
    console.log("enriobjn : ", enrollID)
    // console.log("enriobjn : ",e)
    const subjectIDs = ["ENG01", "HIN02", "MAT03", "REAS04", "COM05", "GK06"];
    const numQuestionsPerSubject = 5; // The number of questions you want from each subject
    const selectedQuestionsBySubject = [];

    for (const subjectID of subjectIDs) {
      const questions = await QuestionBank.findOne({ SubjectID: subjectID });

      if (questions && questions.questions) {
        const subjectQuestions = questions.questions;

        // Using Fisher-Yates algorithm for Random Questions
        for (let i = subjectQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [subjectQuestions[i], subjectQuestions[j]] = [subjectQuestions[j], subjectQuestions[i]];
        }

        const selectedQuestionsFromSubject = subjectQuestions.slice(0, numQuestionsPerSubject);

        selectedQuestionsBySubject.push({ subjectID, questions: selectedQuestionsFromSubject });
      }
    }

    console.log(selectedQuestionsBySubject);
    var obj = {
      EnrollID: enrollID,
      paper: selectedQuestionsBySubject
    }

    console.log(obj);
    return res.status(201).json({ QuestionPaperObject: obj });
    // res.status(201).json(selectedQuestionsBySubject);
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

const viewRegistrationCandidateDocument = async (req , res)=>{
  try {
  var userId = req.params.userId;
  // console.log("userId : " , userId);
    var candidateDocument = await userDocument.findOne({userID : userId});
    res.json(candidateDocument);

    // console.log("Candidate data : " , candidateDocument);
  } catch (err) {
    console.log('Something went wrong:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const allowUser = async (req, res) => {
  var Id = req.params.userId;
  console.log("Id : ", Id);
  try {
    var result = await rsg.updateOne({ _id: Id },{$set: {examAllow: true}});
    console.log("Admin Allow User Update Successfully");
  } catch (error) {
    console.log("Error while Allow user for 4th attempt : " , error);
  }
}

export { createExam, createShift, uploadQuestionFile, readExcelController, getQuestionController, viewRegistrationCandidate , viewRegistrationCandidateDocument , allowUser };
