import express from 'express';
import { Authentication } from '../middlewares/auth.js';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/:userId', Authentication, getMe);

export default userRouter;
