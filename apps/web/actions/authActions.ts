"use server";

import { UserSigninSchema, UserSignupSchema } from "@workspace/common/types";
import { signIn, signOut } from "next-auth/react";

import { redirect } from "next/navigation";
import prismaClient from "@workspace/db";
import bcrypt from "bcrypt";

export interface FormState {
  message: string;
  user?: {
    id: string;
    name: string;
    username: string;
  };
  errors?: any;
}

export async function signupAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    name: `${formData.get("firstname")} ${formData.get("lastname")}`,
    username: `${formData.get("username")}`,
    password: `${formData.get("password")}`,
  };

  if (formData.get("password") !== formData.get("verify-password")) {
    return { message: "Passwords do not match." };
  }

  const validatedFields = UserSignupSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    // Hash password
    const saltRounds = parseInt(process.env.SALTROUNDS || "10");
    const hashedPassword = await bcrypt.hash(
      validatedFields.data.password,
      saltRounds
    );

    // Create user in database
    const userCreated = await prismaClient.user.create({
      data: {
        username: validatedFields.data.username,
        password: hashedPassword,
        name: validatedFields.data.name,
      },
    });

    // Auto sign in after signup
    const signInResult = await signIn("credentials", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      throw new Error("Failed to sign in after signup");
    }

    return {
      user: {
        id: userCreated.id,
        name: userCreated.name || "",
        username: userCreated.username,
      },
      message: "User created successfully.",
    };
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle unique constraint violation (username already exists)
    if (error.code === "P2002") {
      return { message: "Username already exists" };
    }

    return { message: "Could not create user. Please try again." };
  }
}

export async function signinAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    username: `${formData.get("username")}`,
    password: `${formData.get("password")}`,
  };

  const validatedFields = UserSigninSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    const result = await signIn("credentials", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false,
    });

    if (result?.error) {
      return { message: "Invalid credentials" };
    }

    // Get user data to return
    const user = await prismaClient.user.findFirst({
      where: { username: validatedFields.data.username },
      select: { id: true, name: true, username: true },
    });

    if (!user) {
      return { message: "User not found" };
    }

    return {
      user: {
        id: user.id,
        name: user.name || "",
        username: user.username,
      },
      message: "User logged in successfully.",
    };
  } catch (error) {
    console.error("Signin error:", error);

    if (error instanceof Error) {
      return { message: "Invalid credentials" };
    }

    return { message: "Could not login user." };
  }
}

export async function signoutAction() {
  await signOut({ redirect: false });
}

export async function redirectToHome() {
  redirect("/home");
}
