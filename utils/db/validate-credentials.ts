import prisma from "./prisma";
import { User } from "@prisma/client";
import { verifyPassword } from "utils/auth/auth";

type ResponseData = {
  user: User | null;
  errorMessage: string;
  httpCode: number;
};

export default async function validateCredentials(
  email: string,
  enteredPassword: string
): Promise<ResponseData> {
  // Get the user's data from our db.
  let user: User | null = null;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    return {
      user: null,
      errorMessage: "Failed to connect to the user database!",
      httpCode: 500,
    };
  }

  // Check if user exists
  if (!user) {
    return {
      user: null,
      errorMessage: `User: ${email} not found!`,
      httpCode: 404,
    };
  }

  // Validate that entered password matches with the user's password.
  const databaseHashedPassword = user.password;
  const passwordEqual = await verifyPassword(
    enteredPassword,
    databaseHashedPassword
  );

  // User entered invalid password.
  if (!passwordEqual) {
    return {
      user: null,
      errorMessage: "Invalid password entered. Please try again.",
      httpCode: 401,
    };
  }
  return {
    user: user,
    errorMessage: "",
    httpCode: 202,
  };
}
