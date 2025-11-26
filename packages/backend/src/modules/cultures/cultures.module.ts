import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturesService } from './cultures.service';
import { CulturesController } from './cultures.controller';
import { Culture } from './entities/culture.entity';
import { Property } from '../properties/entities/property.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Culture, Property]), AuthModule],
  controllers: [CulturesController],
  providers: [CulturesService],
  exports: [CulturesService],
})
export class CulturesModule {}
