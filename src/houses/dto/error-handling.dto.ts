import { IsString } from 'class-validator';

export class ValidationErrorDto {
  @IsString()
  name: string;

  @IsString()
  message: string;
}

export class ValidationResponseDto {
  errors: ValidationErrorDto[];
}
