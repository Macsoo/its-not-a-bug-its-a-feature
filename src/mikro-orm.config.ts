import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.cldcmqpawaqwwwtzuwkk',
    password: process.env.SUPABASE_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
};

export default config;