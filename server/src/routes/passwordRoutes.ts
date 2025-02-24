import { Router,Request,Response } from "express";
import prisma from "../config/database.js";
import { authLimitter } from "../config/rateLimit.js";
import { ZodError } from "zod";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../helper.js";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/passwordValidation.js";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
const router = Router();


//*Forget password 
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
        
        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`
        const html =await renderEmailEjs("forget-password",{url: url})
         await emailQueue.add(emailQueueName, {
           to: payload.email,
           subject: "Reset your password",
           body:html
         });

         res.json({message:"Password reset link sent successfully! please check your email."})
        
        
    } catch (error) {
         if (error instanceof ZodError) {
              const errors = formatError(error);
              res.status(422).json({ message: "Invalid Data", errors });
            }
            res.status(500)
            .json({ message: "Something went wrong.pls try again!" });
          }
});

// *Reset password
router.post("/reset-password",async(req:Request, res:Response) => {
    try {
        const body=req.body;
        const payload=resetPasswordSchema.parse(body);
        
        let user = await prisma.user.findUnique({
          where: {
            email: payload.email,
          },
        });
        if (!user || user === null) {
          res.status(422).json({
            message: "Invalid Data",
            errors: {
              email: "Link is not correct make sure you copied correct link.",
            },
          });
        }

        //* Check token
        if(user?.password_reset_token!==payload.token){
           res.status(422).json({
             message: "Invalid Data",
             errors: {
               email: "Link is not correct make sure you copied correct link.",
             },
           });
        }

        //* Check 2 hours timeframe
        const hoursDiff=checkDateHourDiff(user?.token_send_at!)
        if(hoursDiff>2){
           res.status(422).json({
             message: "Invalid Data",
             errors: {
               email: "Password reset token got expired .please send new token! ",
             },
           });
        }

    } catch (error) {
        if (error instanceof ZodError) {
          const errors = formatError(error);
          res.status(422).json({ message: "Invalid Data", errors });
        }
        res
          .status(500)
          .json({ message: "Something went wrong.pls try again!" });
    }
});


export default router;