import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import type {Rel} from '@mikro-orm/core';
import {Dog} from "@/entities/dog";

@Entity()
export class DogImage {
    @PrimaryKey()
    id!: number;

    @ManyToOne()
    dog!: Rel<Dog>;

    @Property({ type: "varchar", length: 510 })
    img_path!: string;
}