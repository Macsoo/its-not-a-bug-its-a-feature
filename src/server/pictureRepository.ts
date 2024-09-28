'use server';

import {DogImage, PrismaClient} from "@prisma/client";

export async function addPicture(picture: DogImage, isPrimary: boolean) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        const img = await trx.dogImage.create({
            data: picture,
        })
        if (isPrimary) {
            if (picture.dogId === null) {
                throw Error("Given picture has no dogId");
            }
            trx.dog.update({
                data: {
                    primaryImgId: img.id
                },
                where: {
                    id: picture.dogId
                }
            })
        }
    })
}

export async function getPicture(pictureId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dogImage.findFirst({
            where: {
                id: pictureId
            }
        })
    })
}

export async function listAllPictures() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findMany();
    })
}

export async function deletePicture(pictureId: number) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.dogImage.delete({
            where: {
                id: pictureId
            }
        })
    })
}

export async function updatePicture(picture: { id: number, dogId?: number, path?: string }) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.dogImage.update({
            data: picture,
            where: {
                id: picture.id
            }
        })
    })
}

export async function listDogPictures(dogId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.dogImage.findMany({
            where: {
                dogId: dogId
            }
        });
    })
}
