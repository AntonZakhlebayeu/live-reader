import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class RegistrationStatus {
  @ApiModelProperty()
  success: boolean;
  @ApiModelProperty()
  message: string;
}
