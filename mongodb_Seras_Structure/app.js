import express from "express";
import connectDB from "./db/connectdb.js";
import candidate from "./routes/candidate.js";
import admin from "./routes/adminRoutes.js";
import ExamPortal from "./routes/ExamPortal.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/candidate", candidate);
app.use("/admin", admin);
app.use("/ExamPortal", ExamPortal);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});