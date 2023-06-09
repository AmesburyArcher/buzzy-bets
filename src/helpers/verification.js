const PASS_LENGTH = 6;

export function verifyPassword(password) {
  const errors = [];
  if (password.length < PASS_LENGTH) {
    errors.push("Your password must be at least 6 characters");
  }
  if (password.search(/[A-Z]/i) < 0) {
    errors.push("Your password must contain at least 1 uppercase letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least 1 digit.");
  }
  if (password.search(/[!@#$%^&*]/) < 0) {
    errors.push("Your password must contain at least 1 special character");
  }
  return errors;
}

export function verifyEmail(email) {
  // if (email === "") return true;
  const atpos = email.indexOf("@");
  const dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    return false;
  }
  return true;
}
