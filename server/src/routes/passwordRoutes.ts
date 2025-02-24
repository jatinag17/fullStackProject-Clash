import { Router,Request,Response } from "express";
import prisma from "../config/database.js";
import { authLimitter } from "../config/rateLimit.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import { forgetPasswordSchema } from "../validation/passwordValidation.js";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
const router = Router();

router.post("/forget-password", authLimitter,async(req:Request,res:Response)=>{
    try {
        const body=req.body;
        const payload=forgetPasswordSchema.parse(body);

        //* Check the user
        let user = await prisma.user.findUnique({where:{
            email:payload.email
        }})
        if(!user || user === null){
             res.status(422).json({message:"Invalid Data",errors:{
                email:"No user found with this email."
            }});
        }
        const salt =await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuidV4(), salt);
        await prisma.user.update({
            data:{
                password_reset_token:token,
                token_send_at:new Date().toISOString()
            },
            where:{
                email:payload.email
            }
        })
        
    } catch (error) {
         if (error instanceof ZodError) {
              const errors = formatError(error);
              res.status(422).json({ message: "Invalid Data", errors });
            }
            res.status(500)
            .json({ message: "Something went wrong.pls try again!" });
          }
})




export default router;