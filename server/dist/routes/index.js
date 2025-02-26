import { Router } from 'express';
import AuthRoutes from './authRoutes.js';
import PasswordRoutes from './passwordRoutes.js';
import VerifyRoutes from './verifyRoutes.js';
const router = Router();
router.use("/api/auth", AuthRoutes);
router.use("/api/auth", PasswordRoutes);
router.use("/", VerifyRoutes);
export default router;
