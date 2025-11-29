import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PlantsApiService } from './services/plants-api.service';

@Controller('cultures')
@UseGuards(JwtAuthGuard)
export class CulturesController {
  constructor(
    private readonly culturesService: CulturesService,
    private readonly plantsApiService: PlantsApiService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCultureDto: CreateCultureDto, @CurrentUser() user: User) {
    return this.culturesService.create(createCultureDto, user.id);
  }

  @Get()
  async findAll(
    @CurrentUser() user: User, 
    @Query('page') page?: string, 
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    const pageNumber = this.parsePositiveInteger(page, 1);
    const limitNumber = this.parsePositiveInteger(limit, 10);

    return this.culturesService.findAll(
      user.id,
      pageNumber,
      limitNumber,
      search,
      sortBy,
      sortOrder,
    );
  }

  @Get('properties')
  getUserProperties(@CurrentUser() user: User) {
    return this.culturesService.getUserProperties(user.id);
  }

  @Get('search/crops')
  @HttpCode(HttpStatus.OK)
  async searchCrops(@Query('q') searchTerm?: string, @Query('limit') limit?: string) {
    const limitNumber = this.parsePositiveInteger(limit, 50);
    return this.plantsApiService.searchCrops(searchTerm, limitNumber);
  }

  @Get('search/cultivars')
  @HttpCode(HttpStatus.OK)
  async searchCultivars(@Query('q') query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }
    return this.plantsApiService.searchCultivars(query, 20);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.culturesService.findOne(id, user.id);
  }

  /**
   * Safely parses a string to a positive integer with a default fallback
   */
  private parsePositiveInteger(value: string | undefined, defaultValue: number): number {
    if (!value) return defaultValue;
    
    const parsed = parseInt(value, 10);
    return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
  }
}
