export interface Property {
  id: string;
  name: string;
  address: string;
  totalArea: number;
  productionArea: number;
  mainCrop: string;
  certifications?: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyDto {
  name: string;
  address: string;
  totalArea: number;
  productionArea: number;
  mainCrop: string;
  certifications?: string;
}

export interface UpdatePropertyDto {
  name?: string;
  address?: string;
  totalArea?: number;
  productionArea?: number;
  mainCrop?: string;
  certifications?: string;
}

export interface PropertiesListResponse {
  data: Property[];
  total: number;
  page: number;
  lastPage: number;
}
