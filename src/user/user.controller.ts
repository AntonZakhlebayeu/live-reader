import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteStatus } from '../auth/responses/delete-status.response';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: UserDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @ApiResponse({
    type: [UserDto],
    status: HttpStatus.OK,
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @ApiResponse({
    type: [UpdateStatus],
    status: HttpStatus.NO_CONTENT,
  })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateStatus> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiResponse({
    type: [DeleteStatus],
    status: HttpStatus.NO_CONTENT
  })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<DeleteStatus> {
    return this.userService.deleteUser(id, req.user);
  }
}
