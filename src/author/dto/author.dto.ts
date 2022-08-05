import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Book } from '../../book/entity/book.entity';

export class AuthorDto {
  @IsNotEmpty()
  @ApiModelProperty()
  id: string;

  @IsNotEmpty()
  @ApiModelProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: 'integer' })
  age: 'integer';

  @IsNotEmpty()
  @ApiModelProperty({ type: Book })
  books: Book[];
}
