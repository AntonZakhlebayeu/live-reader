import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './responses/registration-status.response';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginStatus } from './responses/login-status.response';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from './decorators';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: RegistrationStatus,
    status: HttpStatus.CREATED,
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

  @ApiResponse({
    type: UserDto,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  @Get('auth')
  public async auth(@User() user): Promise<UserDto> {
    return this.authService.auth(user);
  }
}
