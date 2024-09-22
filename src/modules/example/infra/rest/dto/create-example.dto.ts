import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
