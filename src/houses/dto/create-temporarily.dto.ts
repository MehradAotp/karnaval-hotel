import { IsString, IsOptional } from 'class-validator';

export class CreateTemporaryDto {
  @IsOptional()
  @IsString()
  data?: string;
}
