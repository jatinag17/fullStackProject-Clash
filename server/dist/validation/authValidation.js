import { z } from "zod";
export const registerSchema = z.object({
    name: z.string({ message: "Name is required." }).min(3, { message: "Name must be 3 characters long" }),
    email: z.string({ message: "Email is required." }).email({ message: "Please type correct email." }),
    password: z.string({ message: "Password is required." }).min(6, { message: "Password must be 6 characters long" }),
    confirm_password: z.string({ message: "Confirm Password is required." }).min(6, { message: "Confirm Password must be 6 characters long" }),
}).refine((data) => data.password === data.confirm_password, { message: "Password and Confirm Password must be same.", path: ["confirm_password"] });
//* Login Schema
export const loginSchema = z.object({
    email: z.string({ message: "Email is required." }).email({ message: "Please type correct email." }),
    password: z.string({ message: "Password is required." }).min(6, { message: "Password must be 6 characters long" }),
});
