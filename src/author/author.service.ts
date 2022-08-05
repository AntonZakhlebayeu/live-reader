import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorDto } from './dto/author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entity/author.entity';
import { toAuthorDto } from './mapping';
import { UpdateStatus } from '../auth/responses/update-status.response';
import { DeleteStatus } from '../auth/responses/delete-status.response';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async findOne(options?: object): Promise<AuthorDto> {
    const author: Author = await this.authorRepo.findOne(options);
    return toAuthorDto(author);
  }

  async create(authorDto: CreateAuthorDto): Promise<AuthorDto> {
    const { firstName, lastName, age } = authorDto;
    const authorInDb = await this.authorRepo.findOne({
      where: { firstName, lastName },
    });
    if (authorInDb) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }

    const author: Author = this.authorRepo.create({
      firstName,
      lastName,
      age,
    });

    await this.authorRepo.save(author);

    return toAuthorDto(author);
  }

  async getAuthorById(id: string): Promise<AuthorDto> {
    const author: Author = await this.authorRepo.findOne({ where: { id } });

    return toAuthorDto(author);
  }

  async getAuthors(): Promise<AuthorDto[]> {
    const authors: Author[] = await this.authorRepo.find();
    const authorsDto: AuthorDto[] = [];
    authors.forEach((author: Author) => {
      authorsDto.push(toAuthorDto(author));
    });
    return authorsDto;
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<UpdateStatus> {
    const { firstName, lastName, age } = updateAuthorDto;

    const currentAuthor = await this.authorRepo.findOne({
      where: { firstName, lastName },
    });

    if (
      currentAuthor &&
      firstName != currentAuthor.firstName &&
      lastName != currentAuthor.lastName
    ) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }

    await this.authorRepo.update(id, {
      firstName,
      lastName,
      age,
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  async deleteAuthor(id: string): Promise<DeleteStatus> {
    const author: Author = await this.authorRepo.findOne({ where: { id } });
    if (!author) {
      throw new HttpException('Author does not exists', HttpStatus.BAD_REQUEST);
    }

    await this.authorRepo.delete(id);

    return {
      success: true,
      message: 'User deleted',
    };
  }
}
