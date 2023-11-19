import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    aadharNo: {
        type: Number
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        require: true
    }, 
    EnrollID: {
        type: String,
        require: true
    },
    income: {
        type: String,
        trim: true
    },
    aadharFile: {
        type: String,
    },
    incomeCertificate: {
        type: String,
    },
    fatherAadharcard: {
        type: String,
    },
    marksheet: {
        type: String,
    },
    latestMarksheet: {
        type: String,
    },
    ClearRounds: {
        type: Number,
        require: true
    },
    examAllow:{
        type:Boolean,
        require:true,
        default:true
    }
})
const rsg = new mongoose.model('Registration2', userSchema);



// const userDocumentSchema = new mongoose.Schema({
//     userID: {
//         type: String,
//         required: true
//     },
//     EnrollID: {
//         type: String,
//         require: true
//     },
//     income: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     aadharFile: {
//         type: String,
//         required: true
//     },
//     incomeCertificate: {
//         type: String,
//         required: true
//     },
//     fatherAadharcard: {
//         type: String,
//         required: true
//     },
//     marksheet: {
//         type: String,
//         required: true
//     },
//     latestMarksheet: {
//         type: String,
//         required: true
//     },
//     ClearRounds: {
//         type: Number,
//         require: true
//     }
// })
// const userDocument = new mongoose.model('userDocument', userDocumentSchema);
// exam.mjs


const examSchema = new mongoose.Schema({
    examTitle: {
        type: String,
        required: true,
    },
    examDate: {
        type: String,
        required: true,
    },
    examDuration: {
        type: Number, // Represented in minutes
        required: true,
    }
});

const exam = mongoose.model('Exam', examSchema);

const shiftSchema = new mongoose.Schema({
    shiftNumber: {
        type: Number,
        required: true,
    },
    maxCandidates: {
        type: Number,
        required: true,
    },
    shiftTimeFrom: {
        type: String, // Starting time of the shift
        required: true,
    },
    shiftTimeTo: {
        type: String, // Ending time of the shift
        required: true,
    }, 
    examVenue: {
        type: String,
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam', // Reference to the parent exam
        required: true,
    },
    enrolledCandidates: [{
        EnrollID: {
            type: String,
            ref: 'Registration2' // Reference to candidate enrollment IDs
        },
        Attendance: {
            type: String,
            default: "Absent"
        },
        userID: {
            type: String,
            default: "None"
        }
    }
    ]
});
const shift = mongoose.model('Shift', shiftSchema);



const uploadQuestionFile = new mongoose.Schema({
    SubjectID: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true
    }
});
const QuestionBank = mongoose.model("QuestionBank", uploadQuestionFile);


const questionPapers = new mongoose.Schema({
    EnrollID: {
        type: String,
        required: true,
    },
    paper: [{
        subjectID: {
            type: String,
            require: true

        },
        questions: [{
            QuestionID: {
                type: Number,
                require: true
            },
            Question: {
                type: String,
                require: true
            },
            OptionA: {
                type: String,
                require: true
            },
            OptionB: {
                type: String,
                require: true
            },
            OptionC: {
                type: String,
                require: true
            },
            OptionD: {
                type: String,
                require: true
            },
            Answer: {
                type: String,
                default: "None"
            }
        }]
    }
    ]
});
const questionPaper = mongoose.model('questionPapers', questionPapers);



export { rsg, exam, shift, QuestionBank,questionPaper };



// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     phoneNo: {
//         type: Number,
//         required: true,
//         minlength: 10,
//         maxlength: 10
//     },
//     address: {
//         type: String,
//         required: true
//     },

//     aadharfile: {
//         type: String
//     },
//     incomefile: {
//         type: String
//     },
//     attempt: {
//         type: Number,
//         required: true

//     }
// })