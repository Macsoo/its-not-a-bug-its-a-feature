'use server';

import {PrismaClient} from '@prisma/client';
import type {Dog} from '@prisma/client';

export async function database() {
    const prisma = new PrismaClient();
    let doggo: Dog | null = await prisma.dog.findFirst({
        where: {
            name: "KUTYU"
        }
    });
    if (doggo === null) {
        doggo = await prisma.$transaction(async (trx) => {
           const img = await trx.dogImage.create({
               data: {
                   path: ''
               }
           });
           const dog = await trx.dog.create({
               data: {
                   chipId: '123456789ABCDEF',
                   name: 'KUTYU',
                   breed: 'Kuty',
                   gender: 'Male',
                   age: 10,
                   description: '',
                   primaryImgId: img.id,
               }
           });
           await trx.dogImage.update({
               where: {
                   id: img.id
               },
               data: {
                   dogId: dog.id
               }
           });
           return dog;
        });
    }
    return doggo.name;
}