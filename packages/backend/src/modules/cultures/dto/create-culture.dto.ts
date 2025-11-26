import { IsNotEmpty, IsUUID, IsInt, Min, IsEnum } from 'class-validator';
import { CultureOrigin } from '../enums/culture-origin.enum';

export class CreateCultureDto {
  @IsNotEmpty({ message: 'Propriedade associada é obrigatória' })
  @IsUUID('4', { message: 'ID da propriedade inválido' })
  propertyId: string;

  @IsNotEmpty({ message: 'Ciclo da cultura é obrigatório' })
  @IsInt({ message: 'Ciclo deve ser um número inteiro' })
  @Min(1, { message: 'Ciclo deve ser maior que zero' })
  cycle: number;

  @IsNotEmpty({ message: 'Origem da cultura é obrigatória' })
  @IsEnum(CultureOrigin, { message: 'Origem deve ser organic, conventional ou transgenic' })
  origin: CultureOrigin;
}
