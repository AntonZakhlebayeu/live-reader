import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateAuthorDto {
  @IsNotEmpty()
  @ApiModelProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: 'integer' })
  age: 'integer';
}
