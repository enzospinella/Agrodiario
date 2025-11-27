import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Culture } from './entities/culture.entity';
import { Property } from '../properties/entities/property.entity';
import { CreateCultureDto } from './dto/create-culture.dto';
import { CultureResponseDto } from './dto/culture-response.dto';

@Injectable()
export class CulturesService {
  constructor(
    @InjectRepository(Culture)
    private culturesRepository: Repository<Culture>,
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(createCultureDto: CreateCultureDto, userId: string): Promise<CultureResponseDto> {
    // Verify that the property exists and belongs to the user
    const property = await this.propertiesRepository.findOne({
      where: { id: createCultureDto.propertyId, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    if (property.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para criar cultura nesta propriedade');
    }

    const culture = this.culturesRepository.create({
      ...createCultureDto,
      userId,
    });

    const savedCulture = await this.culturesRepository.save(culture);
    
    // Load the property relationship
    const cultureWithProperty = await this.culturesRepository.findOne({
      where: { id: savedCulture.id },
      relations: ['property'],
    });

    return this.mapToResponseDto(cultureWithProperty);
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: CultureResponseDto[]; total: number; page: number; lastPage: number }> {
    const skip = (page - 1) * limit;

    const [cultures, total] = await this.culturesRepository.findAndCount({
      where: { userId, isActive: true },
      relations: ['property'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const data = cultures.map((culture) => this.mapToResponseDto(culture));

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId: string): Promise<CultureResponseDto> {
    const culture = await this.culturesRepository.findOne({
      where: { id, isActive: true },
      relations: ['property'],
    });

    if (!culture) {
      throw new NotFoundException('Cultura não encontrada');
    }

    // Verify ownership
    if (culture.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta cultura');
    }

    return this.mapToResponseDto(culture);
  }

  async getUserProperties(userId: string): Promise<any[]> {
    const properties = await this.propertiesRepository.find({
      where: { userId, isActive: true },
      select: ['id', 'name', 'address', 'totalArea', 'productionArea', 'mainCrop'],
      order: { name: 'ASC' },
    });

    return properties;
  }

  private mapToResponseDto(culture: Culture): CultureResponseDto {
    const response: CultureResponseDto = {
      id: culture.id,
      propertyId: culture.propertyId,
      userId: culture.userId,
      cultureName: culture.cultureName,
      cultivar: culture.cultivar,
      cycle: culture.cycle,
      origin: culture.origin,
      supplier: culture.supplier,
      plantingDate: culture.plantingDate,
      plantingArea: culture.plantingArea,
      observations: culture.observations,
      isActive: culture.isActive,
      createdAt: culture.createdAt,
      updatedAt: culture.updatedAt,
    };

    if (culture.property) {
      response.property = {
        id: culture.property.id,
        name: culture.property.name,
        address: culture.property.address,
        totalArea: culture.property.totalArea,
        productionArea: culture.property.productionArea,
        mainCrop: culture.property.mainCrop,
      };
    }

    return response;
  }
}
