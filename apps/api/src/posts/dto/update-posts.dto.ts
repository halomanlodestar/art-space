import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePostsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
