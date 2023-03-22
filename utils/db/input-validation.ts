import RegisteredUser from "models/RegisteredUser";
import User from "../../models/User";
import { z } from "zod";

/**
 * Validates a password.
 * @param {string} password
 * @returns boolean
 */
export function validatePassword(
  password: string
): z.SafeParseReturnType<string, string> {
  const passwordSchema = z
    .string({ invalid_type_error: "Password must be a string." })
    .min(7, "Password must be greater than or equal to 7 characters.");

  return passwordSchema.safeParse(password);
}
/**
 * Determines if a string email is valid.
 * @param {string} email
 * @returns boolean
 */
export function validateEmail(
  email: string
): z.SafeParseReturnType<string, string> {
  const emailSchema = z
    .string({ invalid_type_error: "Email must be a string." })
    .email({ message: "Invalid email address." });

  return emailSchema.safeParse(email);
}

/**
 * Determines if a string name is valid.
 * @param {string} name
 * @returns boolean
 */
export function validateName(
  name: string
): z.SafeParseReturnType<string, string> {
  const nameSchema = z
    .string({ invalid_type_error: "Name must be a string." })
    .nonempty("Name must not be empty.");

  return nameSchema.safeParse(name);
}

/**
 * Validates the user's data.
 */
export function validateUserData(
  userData: User
): z.SafeParseReturnType<User, User> {
  const UserSchema = z.object({
    email: z.string().trim().email("Invalid email entered."),
    firstName: z.string().trim().nonempty("Invalid name entered."),
    lastName: z.string().trim().nonempty("Invalid name entered"),
  });

  return UserSchema.safeParse(userData);
}
/**
 * Validates Registered user data.
 */
export function validateRegisteredUserData(
  userData: RegisteredUser
): z.SafeParseReturnType<RegisteredUser, RegisteredUser> {
  const UserSchema = z.object({
    email: z.string().trim().email("Invalid email entered."),
    firstName: z.string().trim().nonempty("Invalid name entered."),
    lastName: z.string().trim().nonempty("Invalid name entered"),
    password: z
      .string({ invalid_type_error: "Password must be a string." })
      .min(7, "Password must be greater than or equal to 7 characters."),
  });

  return UserSchema.safeParse(userData);
}

export function validateRequestId(
  userId: string
): z.SafeParseReturnType<string, string> {
  const userIdSchema = z.string({
    invalid_type_error: "Invalid argument passed",
  });

  return userIdSchema.safeParse(userId);
}
