import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserDto } from 'src/user/dto/user.dto';

export class LoginStatus {
  @ApiModelProperty()
  user: UserDto;
  @ApiModelProperty()
  accessToken: any;
  @ApiModelProperty()
  expiresIn: any;
}
