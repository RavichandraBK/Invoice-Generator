import express, { Request, Response } from "express";
import User from "../Models/users";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userChk = await User.findOne({ email });
    if (!userChk) {
      res.status(404).json({ message: "User not found, kindly register" });
    } else {
      const chkPassword = await bcrypt.compare(password, userChk.password);
      if (!chkPassword) res.json({ message: "Invalid credentials" });
      else {
        const token = jwt.sign(
          userChk.toJSON(),
          process.env.SECRET_KEY as Secret
        );
        res.json({
          message: `${userChk.name} logged in successfuly`,
          name:userChk.name,
          userId: userChk._id,
          token,
        });
      }
    }
  } catch (err) {
    console.log("Error while login", err);
    res.status(500).json("Internal server error");
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUsr = await User.findOne({ email });
    if (existingUsr) {
      res.json({ message: "User already exists, kindly login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      res.json({ message: `${newUser.name} registered successfully` });
    }
  } catch (err) {
    console.log("Error while registration", err);
    res.status(500).json("Internal server error");
  }
});

export default router;
