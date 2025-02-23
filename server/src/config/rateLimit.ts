import rateLimit from "express-rate-limit";

export  const appLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders:'draft-7',
  legacyHeaders:false, // 
});


export  const authLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30, // limit each IP to 100 requests per windowMs
  standardHeaders:'draft-7',
  legacyHeaders:false, // 
});