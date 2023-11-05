"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const existingUser = yield User_1.default.findOne({ username });
                if (existingUser) {
                    res.status(400).json({ message: "User already exists" });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = new User_1.default({
                    username,
                    password: hashedPassword,
                });
                yield newUser.save();
                res.status(201).json({ message: "User registered successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_1.default.findOne({ username });
                if (!user) {
                    res.status(401).json({ message: "User not found" });
                    return;
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ message: "Invalid password" });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ _id: user._id, name: user.username }, process.env.JWT_SECRET, {
                    expiresIn: "30000h",
                });
                res.json({ token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = new AuthController();
