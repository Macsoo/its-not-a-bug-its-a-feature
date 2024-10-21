'use server';

import {Gender} from '@prisma/client';
import type {Dog, DogImage} from '@prisma/client';
import {getPrisma} from "@/utils";

export async function addDog(params: {
    chipId: string,
    name: string,
    age: number,
    gender: Gender,
    breed: string,
    description: string,
    adopted: boolean,
    imgPath: string
}): Promise<void> {
    const prisma = getPrisma();
    await prisma.$transaction(async (trx) => {
        if (params.chipId === null || params.name === null || params.age < 0) {
            throw new Error('Not valid info was given: ' + params);
        }
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
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findFirst({
            where: {
                id: dogId
            },
        })
    });
}

export async function listAllDogs() {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findMany();
    });
}

export async function deleteDog(dogId: number): Promise<void> {
    const prisma = getPrisma();
    await prisma.$transaction(async (trx) => {
        await prisma.dogImage.updateMany({
            data: {
                dogId: null,
            },
            where: {
                dogId: dogId,
            }
        });
        await trx.dog.delete({
            where: {
                id: dogId,
            },
        });
        await trx.dogImage.deleteMany({
            where: {
                dogId: dogId,
            },
        });
    });
}

export async function updateDog(params: {
    id: number,
    chipID?: string,
    name?: string,
    age?: number,
    gender?: Gender,
    breed?: string,
    description?: string,
    adopted?: boolean
}): Promise<void> {
    const prisma = getPrisma();
    await prisma.$transaction(async (trx) => {
        await trx.dog.update({
            data: params,
            where: {
                id: params.id,
            }
        })
    });
}

export async function adoptDog(dogId: number): Promise<void> {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        await trx.dog.update({
            data: {
                adopted: true,
            },
            where: {
                id: dogId,
            }
        })
    })
}

export async function addPictures(dogId: number, picturesPath: string[]): Promise<void> {
    const prisma = getPrisma();
    const selectedDog = await getDog(dogId);
    if (selectedDog === null) {
        throw Error('Not a valid dog was given');
    }
    await prisma.$transaction(async (trx) => {
        const picturePromises = picturesPath.map(path => {
            return trx.dogImage.create({
                data: {
                    dogId: dogId,
                    path: path,
                }
            });
        });
        await Promise.all(picturePromises);
    });
}