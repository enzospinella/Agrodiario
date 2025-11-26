import { CultureOrigin } from '../enums/culture-origin.enum';

export class CultureResponseDto {
  id: string;
  propertyId: string;
  userId: string;
  cycle: number;
  origin: CultureOrigin;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  property?: {
    id: string;
    name: string;
    address: string;
    totalArea: number;
    productionArea: number;
    mainCrop: string;
  };
}
