import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const Authentication = async (req, res, next) => {
  try {
    const { token } = req.cookies
    const authorized = Jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ ERR: "Authentication auth", err });
  }
};

export const anOther = async (req, res, next) => {
  try {
    const auth = req.header("Authorization");
    const authorized = Jwt.verify(auth, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: authorized._id });
    console.log(user, "userrr");
    next();
  } catch (err) {
    res.status(400).json({ ERR: "anOther auth", err });
  }
};