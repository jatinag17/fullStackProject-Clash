import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(authHeader ===null || authHeader === undefined){
         res.status(401).json({status:401,message:"Unauthorized"})
    }
    const token = authHeader.split(" ")[1]

    //* Verify token
    jwt.verify(token,process.env.SECRET_KEY!,(err,user)=>{
        if(err)
             res.status(401).json({status:401,message:"Unauthorized"})
        req.user = user as AuthUser
        next(); 
    });
}


export default authMiddleware;