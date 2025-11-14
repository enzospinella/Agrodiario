import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyResponseDto } from './dto/property-response.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, userId: string): Promise<PropertyResponseDto> {
    // Validate that production area is not greater than total area
    if (createPropertyDto.productionArea > createPropertyDto.totalArea) {
      throw new BadRequestException('A área de produção não pode ser maior que a área total');
    }

    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      userId,
    });

    const savedProperty = await this.propertiesRepository.save(property);
    return new PropertyResponseDto(savedProperty);
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: PropertyResponseDto[]; total: number; page: number; lastPage: number }> {
    const skip = (page - 1) * limit;

    const [properties, total] = await this.propertiesRepository.findAndCount({
      where: { userId, isActive: true },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const data = properties.map((property) => new PropertyResponseDto(property));

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId: string): Promise<PropertyResponseDto> {
    const property = await this.propertiesRepository.findOne({
      where: { id, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    // Verify ownership
    if (property.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta propriedade');
    }

    return new PropertyResponseDto(property);
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
  ): Promise<PropertyResponseDto> {
    const property = await this.propertiesRepository.findOne({
      where: { id, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    // Verify ownership
    if (property.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar esta propriedade');
    }

    // Validate production area vs total area
    const newTotalArea = updatePropertyDto.totalArea ?? property.totalArea;
    const newProductionArea = updatePropertyDto.productionArea ?? property.productionArea;

    if (newProductionArea > newTotalArea) {
      throw new BadRequestException('A área de produção não pode ser maior que a área total');
    }

    Object.assign(property, updatePropertyDto);
    const updatedProperty = await this.propertiesRepository.save(property);

    return new PropertyResponseDto(updatedProperty);
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const property = await this.propertiesRepository.findOne({
      where: { id, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    // Verify ownership
    if (property.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para deletar esta propriedade');
    }

    // Soft delete
    property.isActive = false;
    await this.propertiesRepository.save(property);

    return { message: 'Propriedade deletada com sucesso' };
  }

  async hardRemove(id: string, userId: string): Promise<{ message: string }> {
    const property = await this.propertiesRepository.findOne({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    // Verify ownership
    if (property.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para deletar esta propriedade');
    }

    await this.propertiesRepository.remove(property);

    return { message: 'Propriedade deletada permanentemente' };
  }
}
