import config from "@/mikro-orm.config";
import {MikroORM} from "@mikro-orm/postgresql";

export async function database() {
    console.log("mikro-orm init");
    const orm = await MikroORM.init(config);
    console.log(orm.em);
    console.log(orm.schema);
    return <p>
        {JSON.stringify(orm.schema)}
    </p>;
}