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
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
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
    registrationDate: {
        type: String,
        require: true
    },
    ClearRounds: {
        type: Number,
        require: true
    },
    examAllow: {
        type: Boolean,
        require: true,
        default: true
    },
    EnrollID: [
        {
            enrollID: {
                type: String,
                require: true,
                default: " "
            },
            Attendance: {
                type: String,
                default: "Absent"
            },
            RemainingTime: {
                type: Number,
                default: 90
            },
            score: {
                type: Number,
                require: true,
                default: 0
            }
        }
    ]
})
const rsg = new mongoose.model('Registration', userSchema);


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
            },
            selectedAnswer: {
                type: String,
                default: " "
            },
            answerStatus: {
                type: Boolean,
                default: false
            },
            answerColor: {
                type: String,
                default: "light"
            },
        }],
    }
    ],
    Score: {
        type: Number,
        default: 0
    }
});
const questionPaper = mongoose.model('questionPapers', questionPapers);


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
        type: String,
        required: true,
    },
    shiftTimeTo: {
        type: String,
        required: true,
    },
    examVenue: {
        type: String,
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    enrolledCandidates: [{
        EnrollID: {
            type: String,
            ref: 'Registration'
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


const LastEnrollId = new mongoose.Schema({
    lastEnrollId: {
        type: String,
        default: ""
    },

});
const lastEnrollModel = mongoose.model("lastEnrollId", LastEnrollId, "lastEnrollId");


const interviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: String
    },
    marks: {
        type: Number
    },
    feedback: {
        type: String
    },
    EnrollID: {
        type: String
    },
    interviewDate: {
        type: String
    },
    curDate: {
        type: String
    }
})
const interview = mongoose.model('interviewClear', interviewSchema);


const houseVisitSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: String
    },
    marks: {
        type: Number
    },
    feedback: {
        type: String
    },
    EnrollID: {
        type: String
    },
    interviewDate: {
        type: String
    },
    curDate: {
        type: String
    }
})
const houseVisit1 = mongoose.model('houseVisitClear', houseVisitSchema);

export { rsg, exam, shift, QuestionBank, questionPaper, lastEnrollModel, interview, houseVisit1 };