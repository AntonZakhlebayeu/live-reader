import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatus } from '../auth/interfaces/update-status.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteStatus } from '../auth/interfaces/delete-status.interface';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: UserDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @ApiResponse({
    type: [UserDto],
  })
  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @ApiResponse({
    type: [UpdateStatus],
  })
  @Put(':id')
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
  })
  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<DeleteStatus> {
    return this.userService.deleteUser(id, req.user);
  }
}
