import {compare, hash} from "bcryptjs";
// Helper functions to use to verify and store user's credentials.

/**
 * Hashes password to be stored in our DB that way we never store raw sensitive data in our DB.
 * @param {string} password
 * @returns A string hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

/**
 * Compares the raw password from the user to the hashedPassword from our database.
 * @param {string} password
 * @param {string} hashedPassword
 * @returns a boolean if the password is correct from our database.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}
