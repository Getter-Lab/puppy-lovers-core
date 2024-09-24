import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Example name',
    example: 'name',
  })
  readonly name: string;
}
