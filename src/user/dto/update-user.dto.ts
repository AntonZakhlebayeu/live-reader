import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: 'integer' })
  age: 'integer';

  @IsNotEmpty()
  @ApiModelProperty()
  passwordHash: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  email: string;
}
