import { User } from "../type/type";

const validateUserInput = (
  firstName: string,
  lastName: string,
  email: string,
  users: User[],
  currentUserId?: number 
) => {
  const errors: { first_name?: string; last_name?: string; email?: string } = {};

  if (!firstName.trim()) {
    errors.first_name = "First name is required";
  }

  if (!lastName.trim()) {
    errors.last_name = "Last name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format";
  } else if (
    users.some((u) => u.email === email && u.id !== currentUserId) 
  ) {
    errors.email = "This email is already taken";
  }

  return errors;
};

export default validateUserInput;
