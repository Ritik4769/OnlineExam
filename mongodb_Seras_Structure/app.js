import express from "express";
import mongoose from "mongoose";
import candidate from "./routes/candidate.js";
import admin from "./routes/adminRoutes.js";

import cors from 'cors';
import connectDB from "./db/connectdb.js";
import cookieparser from 'cookie-parser';
import expresssession from 'express-session'
const app = express();
const PORT = 3002;
console.log(connectDB)
app.set("views", "views");
app.set("view engine", "ejs");
app.use(cookieparser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use("/candidate", candidate); 
app.use("/admin", admin);
// app.use('./public/images', express.static('uploads'));
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
