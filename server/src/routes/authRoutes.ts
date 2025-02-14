import {Router,Request,Response} from 'express';
import { registerSchema } from '../validation/authValidation.js';

const router = Router();

//* Register route
router.post("/register",async(req:Request,res:Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
         res.json(payload)
    } catch (error) {
    res.status(422).json(error)
    }
    
});



export default router;

