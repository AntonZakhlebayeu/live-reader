import { AuthorDto } from './dto/author.dto';
import { Author } from './entity/author.entity';

export const toAuthorDto = (data: Author): AuthorDto => {
  const { id, firstName, lastName, age, books } = data;
  return {
    id,
    firstName,
    lastName,
    age,
    books,
  };
};
