import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  image?: string;
}
