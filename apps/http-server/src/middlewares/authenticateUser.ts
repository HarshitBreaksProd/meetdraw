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
  let token = req.cookies["jwt"];

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    res.status(401).json({
      message: "The user is not logged in",
    });
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
    ) as JwtPayload;

    if (!verified?.id) {
      res.status(401).json({
        message: "User not registered, Invalid token",
      });
      return;
    }

    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
