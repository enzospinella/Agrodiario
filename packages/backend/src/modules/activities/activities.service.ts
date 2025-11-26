// src/activities/activity.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { join } from 'path';
import * as fs from 'fs'; 

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(
    createActivityDto: CreateActivityDto, 
    files: Array<Express.Multer.File> = []
  ): Promise<Activity> {

    console.log('--- DEBUG SERVICE ---');
    if (files && files.length > 0) {
      console.log('Primeiro arquivo recebido:', files[0]);
      console.log('Tem propriedade filename?', 'filename' in files[0]);
      console.log('Valor de filename:', files[0].filename);
    } else {
      console.log('Nenhum arquivo recebido no Service');
    }
    
    const fileNames = files ? files.map(file => file.filename) : [];

    console.log('Nomes para salvar no banco:', fileNames);

    const newActivity = this.activityRepository.create({
      ...createActivityDto,
      anexos: fileNames,
    });

    return await this.activityRepository.save(newActivity);
  }

  async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Atividade com ID ${id} não encontrada.`);
    }
    return activity;
  }

  async update(
    id: number, 
    updateActivityDto: UpdateActivityDto,
    files: Array<Express.Multer.File> = []
  ): Promise<Activity> {
    const activity = await this.findOne(id);

    let currentAnexos = activity.anexos || [];

    if (updateActivityDto.removedFiles) {
      try {
        const filesToRemove: string[] = JSON.parse(updateActivityDto.removedFiles);
        
        currentAnexos = currentAnexos.filter(filename => !filesToRemove.includes(filename));

        filesToRemove.forEach(filename => {
          const filePath = join(__dirname, '..', '..', 'uploads', filename);
          
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            console.log(`Arquivo deletado: ${filename}`);
          }
        });
      } catch (error) {
        console.error('Erro ao processar arquivos removidos:', error);
      }
    }

    const newFileNames = files ? files.map(file => file.filename) : [];
    
    const finalAnexos = [...currentAnexos, ...newFileNames];

    const { removedFiles, ...dataToUpdate } = updateActivityDto;

    const updatedActivity = this.activityRepository.merge(activity, {
      ...dataToUpdate,
      anexos: finalAnexos,
    });

    return await this.activityRepository.save(updatedActivity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);

    if (activity.anexos && activity.anexos.length > 0) {
      activity.anexos.forEach(filename => {
        const filePath = join(__dirname, '..', '..', 'uploads', filename);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (e) {
            console.error(`Erro ao deletar anexo ${filename}`, e);
          }
        }
      });
    }

    const result = await this.activityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Atividade com ID ${id} não encontrada.`);
    }
  }
}