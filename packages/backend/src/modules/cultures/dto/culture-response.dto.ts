import { CultureOrigin } from '../enums/culture-origin.enum';

export class CultureResponseDto {
  id: string;
  propertyId: string;
  userId: string;
  cultureName: string;
  cultivar: string;
  cycle: number;
  origin: CultureOrigin;
  supplier: string;
  plantingDate: Date;
  plantingArea: number;
  observations?: string;
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
