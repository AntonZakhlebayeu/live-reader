import { User } from './user/entity/user.entity';
import { UserDto } from './user/dto/user.dto';

export const toUserDto = (data: User): UserDto => {
  const {
    id,
    firstName,
    lastName,
    username,
    email,
    registerDate,
    lastLoginDate,
    age,
  } = data;
  return {
    id,
    username,
    email,
    firstName,
    lastName,
    age,
    lastLoginDate,
    registerDate,
  };
};
