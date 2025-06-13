"use server";
import { UserSigninSchema, UserSignupSchema } from "@workspace/common/types";
import axios from "axios";
import { cookies } from "next/headers";

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
    const res = await axios.post(
      "http://localhost:3001/api/v1/auth/signup",
      validatedFields.data,
      { withCredentials: true }
    );
    if (res.data.token) {
      (await cookies()).set("jwt", res.data.token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    return {
      user: {
        id: res.data.user.id,
        name: res.data.user.name,
        username: res.data.user.username,
      },
      message: "User created successfully.",
    };
  } catch (error) {
    console.log(error);
    const message = (error as any).response.data.message;
    if (message) {
      return { message };
    }
    return { message: "Could not create user." };
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
    const res = await axios.post(
      "http://localhost:3001/api/v1/auth/signin",
      validatedFields.data,
      { withCredentials: true }
    );
    if (res.data.token) {
      (await cookies()).set("jwt", res.data.token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    return {
      user: {
        id: res.data.user.id,
        name: res.data.user.name,
        username: res.data.user.username,
      },
      message: "User logged in successfully.",
    };
  } catch (error) {
    console.log(error);
    const message = (error as any).response.data.message;
    if (message) {
      return { message };
    }
    return { message: "Could not login user." };
  }
}
