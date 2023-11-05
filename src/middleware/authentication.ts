// authenticationMiddleware.js
import { Request, Response, NextFunction } from "express";
import jwt,{Secret} from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET as Secret // Replace with your actual secret key
// custom.d.ts

// declare module 'express' {
//     interface Request {
//       decoded: any; 
//     }
//   }
  

function authenticateUser(req:any, res:any, next:NextFunction) {
  // Check if a token is present in the request headers
  const authorizationHeader = req.headers.authorization;


  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify the token with your secret key
  jwt.verify(token, secretKey, (err: Error | null, user: any)=> {
    if (err) {
        console.log(err)
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // If the token is valid, attach the user object to the request
    req.decoded = user;
    console.log(req.decoded)
    next();
  });
}

export default authenticateUser;
