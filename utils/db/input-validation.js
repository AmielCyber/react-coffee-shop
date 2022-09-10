"use strict";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isString = (value) => typeof value === "string";

/**
 * Determines if a string email is valid.
 * @param {string} email
 * @returns boolean
 */
function emailIsValid(email) {
  return isString(email) && isNotEmpty(email) && isEmail(email);
}

/**
 * Determines if a string name is valid.
 * @param {string} name
 * @returns boolean
 */
function nameIsValid(name) {
  return isString(name) && isNotEmpty(name);
}

/**
 * Validates the user's data.
 * @param {firstName:string, lastName:string, email:string} userData
 * @returns string containing the failed validation or an empty string if the user's data is valid.
 */
function userDataIsValid(userData) {
  if (!userData) {
    // if the user object does not exists
    return "No user data entered";
  }
  if (!(nameIsValid(userData.firstName) && nameIsValid(userData.lastName))) {
    //names are invalid
    return "Invalid name entered";
  }
  if (!emailIsValid(userData.email)) {
    // email is invalid
    return "Invalid email entered";
  }
  // User data has valid inputs therefore an empty error string.
  return "";
}

/**
 * Validates a password.
 * @param {string} password
 * @returns boolean
 */
function passwordIsValid(password) {
  return isString(password) && isNotEmpty(password) && password.length > 6;
}

module.exports = {
  emailIsValid,
  nameIsValid,
  userDataIsValid,
  passwordIsValid,
};
