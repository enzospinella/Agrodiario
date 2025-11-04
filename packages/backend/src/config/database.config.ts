import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'agrodiario',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.NODE_ENV === 'development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
}));
