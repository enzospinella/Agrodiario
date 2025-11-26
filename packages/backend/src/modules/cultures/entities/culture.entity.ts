import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Property } from '../../properties/entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { CultureOrigin } from '../enums/culture-origin.enum';

@Entity('cultures')
export class Culture extends BaseEntity {
  // Relationship to Property
  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'uuid' })
  propertyId: string;

  // Relationship to User (owner)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  // Culture cycle in days
  @Column({ type: 'integer' })
  cycle: number;

  // Culture origin (organic, conventional, transgenic)
  @Column({
    type: 'enum',
    enum: CultureOrigin,
  })
  origin: CultureOrigin;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
