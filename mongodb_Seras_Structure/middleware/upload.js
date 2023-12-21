
import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
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

var upload3 = multer({
    storage: storage
}).fields([
    { name: 'studentImage', maxCount: 1 }
]);

var upload4 = multer({
    storage: storage
}).fields([
    { name: 'image', maxCount: 1 }
]);

var upload5 = multer({
    storage: storage
}).fields([
    { name: 'batchImage', maxCount: 1 }
]);

var upload6 = multer({
    storage: storage
}).fields([
    { name: 'centerImage', maxCount: 1 }
]);

var upload7= multer({
    storage: storage
}).fields([
    { name: 'bannerImg', maxCount: 1 }
]);
var upload8 = multer({
    storage: storage
}).fields([
    { name: 'interviewFile', maxCount: 1 }
]);;
var upload9 = multer({
    storage: storage
}).fields([
    { name: 'homeFile', maxCount: 1 }
]);;
export { upload, upload2, upload3, upload4, upload5,upload6,upload7,upload8,upload9};