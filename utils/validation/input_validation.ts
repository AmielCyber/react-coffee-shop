const MIN_PASSWORD_LENGTH = 7;
const isNotEmpty = (value: string): boolean => value.trim() !== "";
const isEmail = (value: string): boolean => value.includes("@");
const isMinPassLength = (value: string): boolean =>
  value.length >= MIN_PASSWORD_LENGTH;

export const isValidPassword = (password: string) => {
  return isNotEmpty(password) && isMinPassLength(password);
};

export const isValidEmail = (email: string) => {
  return isNotEmpty(email) && isEmail(email);
};

export const isValidName = (userName: string) => {
  return isNotEmpty(userName);
};
