import express from "express";
import mongoose from "mongoose";
import web from "./routes/web.js";
import admin from "./routes/adminRoutes.js";

import cors from 'cors';
import connectDB from "./db/connectdb.js";
import cookieparser from 'cookie-parser';
const app = express();
const PORT = 3002;
console.log(connectDB)
app.set("views", "views");
app.set("view engine", "ejs");
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", web);
app.use("/admin", admin);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// app.use('./public/images', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});