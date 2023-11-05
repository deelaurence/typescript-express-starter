import { Request, Response } from "express";


const dashboard = async (req:any, res:any) =>  {
    
    const userName = req.decoded.name; 
    // Respond with the user's name
    res.json({ message: `Hello ${userName}` });
}

export default dashboard

