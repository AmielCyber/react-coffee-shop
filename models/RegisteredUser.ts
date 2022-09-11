import User from "./User";

interface RegisteredUser extends User {
  password: string;
}

export default RegisteredUser;
