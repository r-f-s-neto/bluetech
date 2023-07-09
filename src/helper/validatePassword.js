export default function validatePassword(password) {
  const valide = password.length >= 8;
  if (valide) {
    return true;
  } else {
    return false;
  }
}
