import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
