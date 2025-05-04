import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export const verifyEmail = (email) => {
  const isGlobalLogicEmail = "@globallogic.com";
  const InternsEmailIds = [
    "joshiabhimanyoo@gmail.com",
    "vineetpandey6464@gmail.com",
    "irtiqa842@gmail.com",
    "vishakhachauhan599@gmail.com",
    "jyotikadasgupta2903@gmail.com",
    "shivanibhovad30@gmail.com",
    "anuradhav125@gmail.com",
    "chandanegc@gmail.com",
    "tribhuwankanaujiya112@gmail.com"
  ];
  return email.endsWith(isGlobalLogicEmail) || InternsEmailIds.includes(email);
};