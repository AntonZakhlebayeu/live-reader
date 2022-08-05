import bcrypt from 'bcryptjs';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
