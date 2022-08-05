import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateStatus {
  @ApiModelProperty()
  success: boolean;
  @ApiModelProperty()
  message: string;
}
