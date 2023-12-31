import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
