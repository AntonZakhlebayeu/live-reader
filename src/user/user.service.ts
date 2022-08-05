import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { toUserDto } from '../mapping';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePasswords } from './utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { DeleteStatus } from '../auth/responses/delete-status.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await comparePasswords(user.passwordHash, password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    user.lastLoginDate = new Date();
    await this.userRepo.save(user);

    return toUserDto(user);
  }

  async findByPayload({ id }: any): Promise<UserDto> {
    return this.findOne({ where: { id } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, passwordHash, email, firstName, lastName, age } = userDto;
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = this.userRepo.create({
      username,
      passwordHash,
      email,
      firstName,
      lastName,
      age,
    });

    await this.userRepo.save(user);

    return toUserDto(user);
  }

  async getUserById(id: string): Promise<UserDto> {
    const user: User = await this.userRepo.findOne({ where: { id } });

    return toUserDto(user);
  }

  async getUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepo.find();
    const usersDto: UserDto[] = [];
    users.forEach((user: User) => {
      usersDto.push(toUserDto(user));
    });
    return usersDto;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateStatus> {
    const { username, passwordHash, email, firstName, lastName, age } =
      updateUserDto;

    const currentUser = await this.userRepo.findOne({ where: { email } });

    if (currentUser && email != currentUser.email) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    await this.userRepo.update(id, {
      username,
      passwordHash,
      email,
      firstName,
      lastName,
      age,
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  async deleteUser(id: string, user: User): Promise<DeleteStatus> {
    if (id !== user.id) {
      throw new HttpException('User was not deleted', HttpStatus.BAD_REQUEST);
    }

    await this.userRepo.delete(id);

    return {
      success: true,
      message: 'User deleted',
    };
  }
}
