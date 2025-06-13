import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;
  const token = cookies["jwt"];

  if (!token) {
    console.log("Token not found");
    res.status(401).json({
      message: "The user is not logged in",
    });
    return;
  }

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
  ) as JwtPayload;

  if (!verified?.id) {
    console.log("User not registered, Invalid token");
    res.status(401).json({
      message: "User not registered, Invalid token",
    });
  }

  req.userId = verified.id;

  next();
}
