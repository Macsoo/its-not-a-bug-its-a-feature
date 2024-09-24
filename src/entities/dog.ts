import {Check, Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import type {Rel, Opt} from '@mikro-orm/core';
import {DogImage} from "@/entities/dog_image";

@Entity()
export class Dog {

    @PrimaryKey()
    id!: number;

    @Property({length: 15, type: "char", nullable: false, unique: true})
    chipId!: string;

    @Property({length: 100, type: "varchar", nullable: false,})
    name!: string;

    @Property()
    age!: number;

    @Property({type: "varchar", length: 6})
    @Check({ expression: "gender IN ('Male', 'Female')" })
    gender!: string;

    @Property({type: 'varchar', length: 100})
    breed!: string;

    @Property({type: 'text'})
    description!: string;

    @Property()
    available: boolean & Opt = true;

    @Property()
    adopted: boolean & Opt = false;

    @OneToOne({ type: DogImage })
    primary_image!: Rel<DogImage>;

    @OneToMany({mappedBy: 'dog'})
    images = new Collection<DogImage>(this);
}