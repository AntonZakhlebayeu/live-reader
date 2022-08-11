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
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { DeleteStatus } from '../auth/responses/delete-status.response';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiResponse({
    type: BookDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('id') id: string): Promise<BookDto> {
    return this.bookService.getBookById(id);
  }

  @ApiResponse({
    type: [BookDto],
    status: HttpStatus.OK,
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @HttpCode(HttpStatus.OK)
  async getBooks(): Promise<BookDto[]> {
    return this.bookService.getBooks();
  }

  @ApiResponse({
    type: [BookDto],
    status: HttpStatus.CREATED,
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return this.bookService.create(createBookDto);
  }

  @ApiResponse({
    type: [UpdateStatus],
    status: HttpStatus.NO_CONTENT,
  })
  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateStatus> {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @ApiResponse({
    type: [DeleteStatus],
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: string): Promise<DeleteStatus> {
    return this.bookService.deleteBook(id);
  }
}
