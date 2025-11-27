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
  findAll(@CurrentUser() user: User, @Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;

    return this.culturesService.findAll(user.id, pageNumber, limitNumber);
  }

  @Get('properties')
  getUserProperties(@CurrentUser() user: User) {
    return this.culturesService.getUserProperties(user.id);
  }

  @Get('search/crops')
  @HttpCode(HttpStatus.OK)
  async searchCrops(@Query('q') searchTerm?: string, @Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 50;
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
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.culturesService.findOne(id, user.id);
  }
}
