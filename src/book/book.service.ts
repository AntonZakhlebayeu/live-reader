import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { Author } from '../author/entity/author.entity';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { DeleteStatus } from '../auth/responses/delete-status.response';
import { toBookDto } from './mapping';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async findOne(options?: object): Promise<BookDto> {
    const book: Book = await this.bookRepo.findOne(options);
    return toBookDto(book);
  }

  async create(bookDto: CreateBookDto): Promise<BookDto> {
    const { title, description, category, authorId, mark } = bookDto;
    const bookInDb = await this.bookRepo.findOne({
      where: { title, description },
    });
    if (bookInDb) {
      throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
    }

    const book: Book = this.bookRepo.create({
      title,
      description,
      category,
      author: await this.authorRepo.findOne({
        where: {
          id: authorId,
        },
      }),
      mark,
    });

    await this.bookRepo.save(book);

    return toBookDto(book);
  }

  async getBookById(id: string): Promise<BookDto> {
    const book: Book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    return toBookDto(book);
  }

  async getBooks(): Promise<BookDto[]> {
    const books: Book[] = await this.bookRepo.find({
      relations: ['author'],
    });
    const booksDto: BookDto[] = [];
    books.forEach((book: Book) => {
      booksDto.push(toBookDto(book));
    });
    return booksDto;
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateStatus> {
    const { title, description, category, mark } = updateBookDto;

    const currentBook: Book = await this.bookRepo.findOne({
      where: { title, description },
    });

    if (
      currentBook &&
      title != currentBook.title &&
      description != currentBook.description
    ) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }

    await this.bookRepo.update(id, {
      title,
      description,
      category,
      mark,
    });

    return {
      success: true,
      message: 'Book updated successfully',
    };
  }

  async deleteBook(id: string): Promise<DeleteStatus> {
    const book: Book = await this.bookRepo.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('Book does not exists', HttpStatus.BAD_REQUEST);
    }

    await this.bookRepo.delete(id);

    return {
      success: true,
      message: 'Book deleted',
    };
  }
}
