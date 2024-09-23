import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

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
    gender!: string;

    @Property({type: 'varchar', length: 100})
    breed!: string;

    @Property({type: 'text'})
    description!: string;

    @Property()
    available: boolean = true;

    @Property()
    adopted: boolean = false;

}