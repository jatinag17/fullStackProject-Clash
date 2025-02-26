import { Router } from 'express';
import { loginSchema, registerSchema } from '../validation/authValidation.js';
import { ZodError } from 'zod';
import { formatError, renderEmailEjs } from '../helper.js';
import prisma from '../config/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
import authMiddleware from '../middleware/AuthMiddleware.js';
import { authLimitter } from '../config/rateLimit.js';
const router = Router();
//* Login routes
router.post("/login", authLimitter, async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        //* Check email
        let user = await prisma.user.findUnique({ where: {
                email: payload.email
            } });
        if (!user || user === null) {
            res.status(422).json({ errors: {
                    email: "Email not found"
                } });
        }
        //* Check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    email: "Invalid Credentials.",
                }
            });
        }
        //* JWT Payload
        let JWTPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = jwt.sign(JWTPayload, process.env.SECRET_KEY, { expiresIn: "365d" });
        res.json({
            message: "Login Successfully!",
            data: {
                ...JWTPayload,
                token: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid Data", errors });
        }
        res
            .status(500)
            .json({ message: "Something went wrong.pls try again!" });
    }
});
//* Login Check route
router.post("/check/credentials", authLimitter, async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        //* Check email
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: {
                    email: "Email not found",
                },
            });
        }
        //* Check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    email: "Invalid Credentials.",
                },
            });
        }
        res.json({
            message: "Login Successfully!",
            data: {},
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid Data", errors });
        }
        res.status(500).json({ message: "Something went wrong.pls try again!" });
    }
});
//* Register route
router.post("/register", authLimitter, async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        //  res.json(payload);
        let user = await prisma.user.findUnique({ where: {
                email: payload.email
            } });
        if (user) {
            res.status(422).json({
                errors: {
                    email: "Email already exists!",
                },
            });
        }
        //* Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        const emailBody = await renderEmailEjs("email-verify", { name: payload.name, url: url });
        //* Send email
        await emailQueue.add(emailQueueName, { to: payload.email, subject: "Clash Email verification", body: emailBody });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });
        res.json({ message: "Please check your email.We have sent your verification email!" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid Data", errors });
        }
        res.status(500).json({ message: "Something went wrong.pls try again!" });
    }
});
//* Get User
router.get("/user", authMiddleware, async (req, res) => {
    const user = req.user;
    res.json({ data: user });
});
export default router;
