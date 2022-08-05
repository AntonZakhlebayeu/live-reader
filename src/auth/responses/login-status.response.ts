import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginStatus {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  accessToken: any;
  @ApiModelProperty()
  expiresIn: any;
}
