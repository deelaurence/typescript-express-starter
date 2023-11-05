import { Request, Response } from "express";
import User, { UserDocument } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  dotenv from 'dotenv'
import {Secret} from "jsonwebtoken"
dotenv.config()

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      const token = jwt.sign({ _id: user._id, name:user.username }, process.env.JWT_SECRET as Secret, {
        expiresIn: "30000h",
      });

      res.json({ token });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController();
