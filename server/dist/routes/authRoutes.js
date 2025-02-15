import { Router } from 'express';
import { registerSchema } from '../validation/authValidation.js';
import { ZodError } from 'zod';
import { formatError } from '../helper.js';
const router = Router();
//* Register route
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        res.json(payload);
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid Data", errors });
        }
        return res.status(500).json({ message: "Something went wrong.pls try again!" });
    }
});
export default router;
