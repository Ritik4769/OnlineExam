// controllers/examController.js
import { userDocument,exam, shift,QuestionBank } from '../modules/Registration.js';
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
    // res.json(savedExam);
    const enrollid = await userDocument.find();
    console.log("enroll id : ", enrollid);
    var EnrollidArr = [];
    for (var i = 0; i < enrollid.length; i++) {
      console.log("all data ", enrollid[i].EnrollID);
      EnrollidArr[i] = enrollid[i].EnrollID
      console.log("Enroll id : ", EnrollidArr[i]);
    }
    return res.status(201).json({ newExam: newExam, EnrollIDs: EnrollidArr });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create the exam.' });
  }
};

const createShift = async (req, res) => {
  try {
    console.log("admin shifts");

    const examid = req.params.examid;
    const EnrollIDs = req.params.EnrollIDs;
    console.log(examid);
    const enrollIdsArray = EnrollIDs.split(',');
    console.log(enrollIdsArray);
    const enrolledCandidates = enrollIdsArray; 
    const { shiftNumber, maxCandidates, shiftTimeFrom, shiftTimeTo } = req.body;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the shift.' });
  }
};

const uploadQuestionFile = async (req, res) => {

  console.log("in uploadQuestionFile");
  var questionFile = req.files['questionFile'][0].originalname;
  console.log(questionFile)
  try {

      // const user = QuestionBank.create({
      //     EnrollID: nextEnrollmentID
      // });
      if (user) {
          console.log('data save', user);
          res.setHeader('Content-Type', 'application/json');
          return res.status(201).json({ message: 'Data saved'});
      }
  } catch (error) {
      console.log("error" + error);
  }
}


export { createExam, createShift,uploadQuestionFile };
