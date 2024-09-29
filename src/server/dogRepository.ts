'use server';

import {Gender, PrismaClient} from '@prisma/client';
import type {Dog, DogImage} from '@prisma/client';

export async function addDog(params: {
    chipId: string,
    name: string,
    age: number,
    gender: Gender,
    breed: string,
    description: string,
    adopted: boolean,
    primaryImgId: number,
    imgDogId: number,
    imgPath: string
}): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        const img: DogImage = await trx.dogImage.create({
            data: {
                path: params.imgPath
            }
        });
        const dog: Dog = await trx.dog.create({
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

export async function getDog(dogId: number): Promise<Dog | null> {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findFirst({
            where: {
                id: dogId
            },
        })
    });
}

export async function listAllDogs() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findMany();
    });
}

export async function deleteDog(dogId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.dog.delete({
            where: {
                id: dogId,
            },
        });
    });
}

export async function updateDog(params: {
    dogId: number,
    chipID?: string,
    name?: string,
    age?: number,
    gender?: Gender,
    breed?: string,
    description?: string,
    adopted?: boolean
}): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        await trx.dog.update({
            data: params,
            where: {
                id: params.dogId,
            }
        })
    });
}

export async function adopted(): Promise<void> {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        await trx.dog.findFirst({
            where: {
                adopted: true,
            }
        })
    })
}

export async function addPictures(dogId: number, picturesPath: string[]): Promise<void> {
    const prisma = new PrismaClient();
    const selectedDog = await getDog(dogId);
    if (selectedDog === null) {
        throw Error('Not a valid dog was given');
    }
    prisma.$transaction(async (trx) => {
        picturesPath.forEach(path => {
            trx.dogImage.create({
                data: {
                    dogId: selectedDog.id,
                    path: path
                }
            })
        })
    })
}