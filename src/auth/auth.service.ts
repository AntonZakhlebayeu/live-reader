import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './responses/registration-status.response';
import { LoginStatus } from './responses/login-status.response';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { toUserDto } from 'src/user/mapping';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this._createToken(user);

    return {
      user: user,
      ...token,
    };
  }

  async auth(user: User): Promise<any> {
    return {
      token: this._createToken(user),
      user: toUserDto(user),
    };
  }

  private _createToken({ id }: UserDto): any {
    const user: JwtPayload = { id };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
