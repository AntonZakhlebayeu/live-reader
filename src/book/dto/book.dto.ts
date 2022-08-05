import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { AuthorDto } from '../../author/dto/author.dto';

export class BookDto {
  @IsNotEmpty()
  @ApiModelProperty()
  id: string;

  @IsNotEmpty()
  @ApiModelProperty()
  title: string;

  @IsNotEmpty()
  @ApiModelProperty()
  description: string;

  @IsNotEmpty()
  @ApiModelProperty()
  category: string;

  @IsNotEmpty()
  @ApiModelProperty()
  mark: number;

  @IsNotEmpty()
  @ApiModelProperty({ type: AuthorDto })
  author: AuthorDto;

  @IsNotEmpty()
  @ApiModelProperty()
  createdAt: Date;
}
