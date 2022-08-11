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
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { DeleteStatus } from '../auth/responses/delete-status.response';
import { AuthorDto } from './dto/author.dto';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';

@ApiTags('authors')
@Controller('api/author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiResponse({
    type: AuthorDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getAuthor(@Param('id') id: string): Promise<AuthorDto> {
    return this.authorService.getAuthorById(id);
  }

  @ApiResponse({
    type: [AuthorDto],
    status: HttpStatus.OK,
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getAuthors(): Promise<AuthorDto[]> {
    return this.authorService.getAuthors();
  }

  @ApiResponse({
    type: [AuthorDto],
    status: HttpStatus.CREATED,
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDto> {
    return this.authorService.create(createAuthorDto);
  }

  @ApiResponse({
    type: [UpdateStatus],
    status: HttpStatus.NO_CONTENT,
  })
  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<UpdateStatus> {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @ApiResponse({
    type: [DeleteStatus],
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAuthor(@Param('id') id: string): Promise<DeleteStatus> {
    return this.authorService.deleteAuthor(id);
  }
}
