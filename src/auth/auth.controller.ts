import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './responses/registration-status.response';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginStatus } from './responses/login-status.response';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: RegistrationStatus,
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @ApiResponse({
    type: LoginStatus,
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return this.authService.login(loginUserDto);
  }
}
