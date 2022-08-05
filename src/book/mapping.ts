import { BookDto } from './dto/book.dto';
import { Book } from './entity/book.entity';
import { AuthorDto } from '../author/dto/author.dto';
import { toAuthorDto } from '../author/mapping';

export const toBookDto = (data: Book): BookDto => {
  const { id, title, description, category, author, mark, createdAt } = data;

  return {
    id,
    title,
    description,
    category,
    author: toAuthorDto(author),
    mark,
    createdAt,
  };
};
