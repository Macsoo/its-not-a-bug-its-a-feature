'use server';

import {PrismaClient} from '@prisma/client';
import type {Dog, DogImage} from '@prisma/client';

export async function database() {
    const prisma = new PrismaClient();
    let doggo: Dog | null = await prisma.dog.findFirst({
        where: {
            name: "KUTUY"
        }
    });
    if (doggo === null) {
        const image: DogImage = await prisma.dogImage.create({
            data: {
                path: ''
            }
        });
        doggo = await prisma.dog.create({
            data: {
                chipId: '123456789ABCDEF',
                name: 'KUTYU',
                age: 10,
                gender: 'Male',
                breed: 'Kuty',
                description: '',
                primaryImg: {
                    connect: {
                        id: image.id
                    },
                },
                images: {
                    connect: [{
                        id: image.id
                    }]
                }
            }
        });
    }
    return doggo.name;
}