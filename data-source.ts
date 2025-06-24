// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/dist/**/*.entity.js'],
  migrations: [__dirname + '/dist/migrations/*.js'],
  // don’t auto-sync in production:
  synchronize: false,
  migrationsRun: false,    // we’ll run explicitly
  // Pooling options:
  extra: {
    connectionLimit: 10,   // max simultaneous connections
  },
});
