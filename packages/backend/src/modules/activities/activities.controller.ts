// src/activities/activity.controller.ts
import { 
    Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, 
    UseInterceptors, UploadedFiles 
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express'; // Importar Interceptor
  import { ActivityService } from './activities.service';
  import { CreateActivityDto } from './dto/create-activity.dto';
  import { UpdateActivityDto } from './dto/update-activity.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
  
  @Controller('activities')
  export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}
  
    @Post()
    // 1. O Interceptor deve vir PRIMEIRO (ou logo após o Post)
    @UseInterceptors(FilesInterceptor('files')) 
    create(
      @Body() createActivityDto: CreateActivityDto,
      // 2. Certifique-se que o decorator é @UploadedFiles() (Plural)
      @UploadedFiles() files: Array<Express.Multer.File>, 
    ) {
      console.log('--- DEBUG FINAL ---');
      
      // Se files continuar undefined, o problema é o MulterModule no Module
      console.log('Arquivos capturados:', files ? files.length : 'ZERO'); 
      
      return this.activityService.create(createActivityDto, files);
    }
  
    @Get()
    findAll() {
      return this.activityService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.activityService.findOne(id);
    }
  
    @Patch(':id')
    @UseInterceptors(FilesInterceptor('files')) // Permite enviar novos arquivos na edição
    update(
      @Param('id', ParseIntPipe) id: number, 
      @Body() updateActivityDto: UpdateActivityDto,
      @UploadedFiles() files: Array<Express.Multer.File>,
    ) {
      return this.activityService.update(id, updateActivityDto, files);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.activityService.remove(id);
    }
  }