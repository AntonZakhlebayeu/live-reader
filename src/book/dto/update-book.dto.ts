import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateBookDto {
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
}
