// src/activities/entities/activity.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ActivityType {
  PREPARO = 'preparo',
  APLICACAO = 'aplicacao',
  COLHEITA = 'colheita',
  MANEJO = 'manejo',
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date; 

  @Column()
  propriedade: string; 

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.PREPARO,
  })
  tipo: ActivityType;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column()
  responsavel: string;

  @Column({ nullable: true })
  insumoNome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  insumoQuantidade: number;

  @Column({ nullable: true })
  insumoUnidade: string;

  @Column('simple-array', { nullable: true })
  anexos: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}