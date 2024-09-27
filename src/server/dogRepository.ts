'use server';

import {Gender, PrismaClient} from '@prisma/client';
import type {Dog, DogImage} from '@prisma/client';

export async function add(params: Dog & DogImage) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        const img = await trx.dogImage.create({
            data: {
                path: params.path
            }
        });
        const dog = await trx.dog.create({
            data: {
                chipId: params.chipId,
                name: params.name,
                age: params.age,
                gender: params.gender,
                breed: params.breed,
                description: params.description,
                adopted: params.adopted,
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
    });
}

export async function get(dogId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findFirst({
            where: {
                id: dogId
            },
        });
    });
}

export async function list() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findMany();
    });
}

export async function deleteDog(dogId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        try {
            return await trx.dog.delete({
                where: {
                    id: dogId,
                },
            });
        } catch (error) {
            console.error('Error deleting dog:', error);
            throw error;
        }
    });
}

export async function update(params: {
    dogId: number,
    chipID?: string,
    name?: string,
    age?: number,
    gender?: Gender,
    breed?: string,
    description?: string,
    adopted?: boolean
}) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        await trx.dog.update({
            data: params,
            where: {
                id: params.dogId,
            }
        })
    });
}

export async function adopted() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        await trx.dog.findFirst({
            where: {
                adopted: true,
            }
        })
    })
}

export async function addPictures(dog: Dog, pictures: DogImage[]) {
    const prisma = new PrismaClient();
    const selectedDog = await get(dog.id);
    if (selectedDog === null) {
        throw Error('Not valid dog was given');
    }
    prisma.$transaction(async (trx) => {
        pictures.forEach(picture => {
            trx.dogImage.create({
                data: {
                    id: picture.id,
                    dogId: selectedDog.id,
                    path: picture.path
                }
            })
        })
    })
}