import { Request, Response } from "express";
import prismaClient from "@workspace/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSigninSchema, UserSignupSchema } from "@workspace/common";

export async function signupController(req: Request, res: Response) {
  const inputValidator = UserSignupSchema;
  const validatedInput = inputValidator.safeParse(req.body);

  if (validatedInput.error) {
    res.status(404).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const saltrounds = parseInt(process.env.SALTROUNDS || "10");
    const hashedPwd = await bcrypt.hash(
      validatedInput.data.password,
      saltrounds
    );
    const userCreated = await prismaClient.user.create({
      data: {
        username: validatedInput.data.username,
        password: hashedPwd,
        name: validatedInput.data.name,
      },
    });
    const user = {
      id: userCreated.id,
      username: userCreated.username,
      name: userCreated.name,
      photo: userCreated.photo,
    };
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "User Signed Up",
      user,
      token,
    });
    return;
  } catch (e) {
    console.log(e);
    const code = (e as unknown as { code?: string }).code;
    if (code === "P2002") {
      res.status(401).json({
        message: "Username already exists",
      });
    }
    res.status(401).json({
      message: "Error faced while creating user, try again",
    });
  }
}

export async function signinController(req: Request, res: Response) {
  const inputValidator = UserSigninSchema;

  const validatedInput = inputValidator.safeParse(req.body);

  if (validatedInput.error) {
    res.status(404).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const userFound = await prismaClient.user.findFirst({
      where: {
        username: validatedInput.data.username,
      },
    });
    if (!userFound) {
      res.status(404).json({
        message: "The username does not exist",
      });
      return;
    }
    const validatedPassword = await bcrypt.compare(
      validatedInput.data.password,
      userFound.password
    );
    if (!validatedPassword) {
      res.status(404).json({
        message: "The password is incorrect",
      });
      return;
    }
    const user = {
      id: userFound.id,
      username: userFound.username,
      name: userFound.name,
      photo: userFound.photo,
    };
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "User Signed In",
      user: user,
      token,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Error faced while loging user in, try again",
    });
  }
}

export async function signoutController(req: Request, res: Response) {
  res.clearCookie("jwt");
  res.json({
    message: "User logged out",
  });
}
