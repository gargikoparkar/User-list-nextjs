
export function validateUserInput(first_name: string, last_name: string, email: string) {
    const errors: { first_name?: string; last_name?: string; email?: string } = {};
  
    if (!first_name.trim()) {
      errors.first_name = "First name is required.";
    }
  
    if (!last_name.trim()) {
      errors.last_name = "Last name is required.";
    }
  
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format.";
    }
  
    return errors;
  }
  