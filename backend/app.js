import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import userRouter from "./routers/userRoutes.js"
import groupRouter from "./routers/groupRoutes.js";
import questionRouter from "./routers/questionRoutes.js";
import answerRouter from "./routers/answerRoutes.js";

import { Authentication } from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cookieParser());



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`yes, DB connected to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB not connected", err);
  });

app.use('/api/users', userRouter);
app.use('/api/groups', Authentication, groupRouter);
app.use('/api/questions', Authentication, questionRouter);
app.use('/api/answers', Authentication, answerRouter);
