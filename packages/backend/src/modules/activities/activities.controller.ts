import { 
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, 
  UseInterceptors, UploadedFiles 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ActivityService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

// Imports necessários para a config local
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = resolve(process.cwd(), 'uploads');
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');

      const sanitizedName = originalName.replace(/\s+/g, '-');

      const finalName = `${Date.now()}-${sanitizedName}`;

      cb(null, finalName);
    },
  }),
};

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  // Injetamos a config diretamente aqui 👇
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions)) 
  create(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
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
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
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