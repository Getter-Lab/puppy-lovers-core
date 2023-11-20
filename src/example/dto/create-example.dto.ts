import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  readonly teste: string;
}
