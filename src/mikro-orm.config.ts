import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Dog } from '@/entites/dog';

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.cldcmqpawaqwwwtzuwkk',
    password: process.env.SUPABASE_PASSWORD,
    entities: [Dog],
    discovery: { disableDynamicFileAccess: true },
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
};

export default config;