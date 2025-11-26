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

@Controller('cultures')
@UseGuards(JwtAuthGuard)
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

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

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.culturesService.findOne(id, user.id);
  }
}
