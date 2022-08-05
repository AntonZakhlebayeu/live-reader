import { AuthorDto } from './dto/author.dto';
import { Author } from './entity/author.entity';
import typeOrmConfig from '../../typeOrm.config';

export const toAuthorDto = (data: Author): AuthorDto => {
  const { id, firstName, lastName, age, books, createdAt } = data;

  return {
    id,
    firstName,
    lastName,
    age,
    books,
    createdAt,
  };
};
