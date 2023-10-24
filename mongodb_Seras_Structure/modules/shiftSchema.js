// // exam.mjs
// import mongoose from 'mongoose';

// // Define the Shift Schema
// const shiftSchema = new mongoose.Schema({
//   shiftNumber: {
//     type: Number,
//     required: true,
//   },
//   maxCandidates: {
//     type: Number,
//     required: true,
//   },
//   shiftTimeFrom: {
//     type: Date, // Starting time of the shift
//     required: true,
//   },
//   shiftTimeTo: {
//     type: Date, // Ending time of the shift
//     required: true,
//   }
//   // exam: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Exam', // Reference to the parent exam
//   //   required: true,
//   // },
//   // enrolledCandidates: [{
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Registration2', // Reference to candidate enrollment IDs
//   // }],
//   // Other shift-related fields can be added here as needed.
// });

// const shift = mongoose.model('Shift', shiftSchema);

// export default shift;
