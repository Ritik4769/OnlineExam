
import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        // cb(null, file.filename + "" + Date.now() + path.extname(file.originalname))
        cb(null, file.originalname) 
    }
})

var upload = multer({
    storage: storage
}).fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 },
    { name: 'fatherAadharcard', maxCount: 1 },
    { name: 'marksheet', maxCount: 1 },
    { name: 'latestMarksheet', maxCount: 1 }
]);;

var upload2 = multer({
    storage: storage
}).fields([
    { name: 'questionFile', maxCount: 1 }
]);;

export { upload,upload2};

// skc
// var storage1 = multer.diskStorage({
//     destination: "./uploads",
//     filename: (req, file, cb) => {
//         let ext = path.extname(file.originalname)
//         // cb(null, file.filename + "" + Date.now() + path.extname(file.originalname))
//         cb(null, new Date().getTime.file.originalname)
//     }
// })

// var upload1 = multer({
//     storage: storage
// }).fields([
//     { name: 'aadharFile', maxCount: 1 },
//     { name: 'incomeCertificate', maxCount: 1 },
//     { name: 'fatherAadharcard', maxCount: 1 },
//     { name: 'marksheet', maxCount: 1 },
//     { name: 'latestMarksheet', maxCount: 1 }
// ]);;

// import multer from 'multer';

// // Define storage and file name settings
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Set the destination folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix); // Generate a unique filename
//     }
// });

// // Create the Multer instance with the storage configuration
// const upload = multer({ storage: storage }).single("aadharfile");

// export default upload;
