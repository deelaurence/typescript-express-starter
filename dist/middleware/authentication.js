"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
// custom.d.ts
// declare module 'express' {
//     interface Request {
//       decoded: any; 
//     }
//   }
function authenticateUser(req, res, next) {
    // Check if a token is present in the request headers
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token with your secret key
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If the token is valid, attach the user object to the request
        req.decoded = user;
        console.log(req.decoded);
        next();
    });
}
exports.default = authenticateUser;
