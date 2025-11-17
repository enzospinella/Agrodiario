// src/activities/activity.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { join } from 'path';
import * as fs from 'fs'; // Importar File System

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  // 1. Recebe os arquivos como argumento opcional
  async create(
    createActivityDto: CreateActivityDto, 
    files: Array<Express.Multer.File> = []
  ): Promise<Activity> {
    
    // Lógica de Arquivos: Extrai apenas o nome gerado pelo Multer
    const fileNames = files ? files.map(file => file.filename) : [];

    const newActivity = this.activityRepository.create({
      ...createActivityDto,
      anexos: fileNames, // Salva o array de strings ["file-123.jpg", "file-456.png"]
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
    // 1. Busca a atividade existente
    const activity = await this.findOne(id);

    // 2. Processa os Arquivos REMOVIDOS
    let currentAnexos = activity.anexos || [];

    if (updateActivityDto.removedFiles) {
      try {
        // O JSON.parse converte a string '["a.jpg"]' em array real ['a.jpg']
        const filesToRemove: string[] = JSON.parse(updateActivityDto.removedFiles);
        
        // Filtra o array do banco de dados (remove os que estão na lista de exclusão)
        currentAnexos = currentAnexos.filter(filename => !filesToRemove.includes(filename));

        // Deleta os arquivos físicos da pasta /uploads
        filesToRemove.forEach(filename => {
          // Caminho absoluto para o arquivo
          const filePath = join(__dirname, '..', '..', 'uploads', filename);
          
          // Verifica se o arquivo existe antes de tentar deletar
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Deleta o arquivo
            console.log(`Arquivo deletado: ${filename}`);
          }
        });
      } catch (error) {
        console.error('Erro ao processar arquivos removidos:', error);
        // Não paramos o processo se der erro ao deletar arquivo físico,
        // mas é bom logar o erro.
      }
    }

    // 3. Processa os NOVOS Arquivos (Uploads)
    const newFileNames = files ? files.map(file => file.filename) : [];
    
    // Combina o que sobrou dos antigos com os novos
    const finalAnexos = [...currentAnexos, ...newFileNames];

    // 4. Atualiza no Banco
    // Removemos o campo 'removedFiles' do DTO antes de passar para o TypeORM
    // (pois ele não existe na tabela do banco)
    const { removedFiles, ...dataToUpdate } = updateActivityDto;

    const updatedActivity = this.activityRepository.merge(activity, {
      ...dataToUpdate,
      anexos: finalAnexos,
    });

    return await this.activityRepository.save(updatedActivity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);

    // Deleta todos os anexos físicos
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