import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
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
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  registerDate: Date;

  @IsNotEmpty()
  @ApiModelProperty()
  lastLoginDate: Date;

  @IsNotEmpty()
  @ApiModelProperty({ type: 'integer' })
  age: 'integer';

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  email: string;
}
