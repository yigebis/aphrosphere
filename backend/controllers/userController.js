import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    const {isMentor, groups, _id} = newUser
    res.json({_id, name, email, isMentor, groups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    const {name, isMentor, groups, _id} = user
    res.json({_id, name, email, isMentor, groups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMe = async (req, res) => {

  const {userId} = req.params;
  try {
    const user = await User.findById( userId );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {name, email, isMentor, groups, _id} = user
    res.json({_id,name, email, isMentor, groups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

