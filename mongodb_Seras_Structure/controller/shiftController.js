// controllers/shiftController.js
// controllers/shiftController.mjs
// import shift from '../modules/shiftSchema.js';

// Create a new shift
// export const createShift = async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { shiftNumber, maxCandidates, shiftTimeFrom, shiftTimeTo, exam, enrolledCandidates } = req.body;

//     // Create a new Shift instance
//     const newShift = new shift({
//       shiftNumber,
//       maxCandidates,
//       shiftTimeFrom,
//       shiftTimeTo,
//       exam, // Reference to the parent exam
//       enrolledCandidates, // Array of candidate enrollment IDs
//     });

//     // Save the shift to the database
//     const savedShift = await newShift.save();

//     // Return the saved shift as the response
//     res.status(201).json(savedShift);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create the shift.' });
//   }
// };

 
