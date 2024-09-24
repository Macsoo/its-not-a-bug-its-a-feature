'use server';

import config from "@/mikro-orm.config";
import {MikroORM} from "@mikro-orm/postgresql";
import {Dog} from "@/entities/dog";

export async function database() {
    console.log("mikro-orm init");
    const orm = await MikroORM.init(config);
    await orm.em.upsert(Dog, {
        chipId: '123456789ABCDEF',
        name: "KUTYI",
        age: 10,
        breed: "Kuty",
        gender: "Male",
        description: "",
        primary_image: {
            img_path: ""
        }
    });
    await orm.em.flush();
    return JSON.stringify(await orm.checkConnection());
}