import bcrypt from "bcryptjs";
const validatePassword = async (pass: string, encryptPass: string) =>
  await bcrypt.compare(pass, encryptPass);

const encryptPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
export default {
  validatePassword,
  encryptPassword,
};
