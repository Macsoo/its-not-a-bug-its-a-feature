import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';

export async function register() {
    const orm = await MikroORM.init(config);
    console.log(orm.em);
    console.log(orm.schema);
}