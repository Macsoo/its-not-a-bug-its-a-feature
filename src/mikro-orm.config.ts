import {Options, PostgreSqlDriver} from '@mikro-orm/postgresql';
import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
import {Dog} from '@/entities/dog';
import {DogImage} from "@/entities/dog_image";

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.cldcmqpawaqwwwtzuwkk',
    password: process.env.SUPABASE_PASSWORD,
    entities: [Dog, DogImage],
    discovery: {disableDynamicFileAccess: true},
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
};

export default config;