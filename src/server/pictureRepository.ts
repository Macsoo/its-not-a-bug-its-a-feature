'use server';

import {getPrisma} from "@/utils";
import {DogImage} from "@prisma/client";
import {getDog} from "@/server/dogRepository";

export async function addPicture(picture: { dogId: number, path: string }, isPrimary: boolean = false): Promise<void> {
    const prisma = getPrisma();
    prisma.$transaction(async (trx) => {
        const img: DogImage = await trx.dogImage.create({
            data: picture,
        })
        if (isPrimary) {
            if (picture.dogId === null) {
                throw Error("Given picture has no dogId");
            }
            trx.dogImage.deleteMany({
                where: {
                    dogId: img.dogId
                }
            });
            trx.dog.update({
                data: {
                    primaryImgId: img.id
                },
                where: {
                    id: picture.dogId
                }
            });
        }
    })
}

export async function getPicture(pictureId: number): Promise<DogImage | null> {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return trx.dogImage.findFirst({
            where: {
                id: pictureId
            }
        })
    })
}

export async function listAllPictures() {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return trx.dog.findMany();
    })
}

export async function deletePicture(pictureId: number): Promise<void> {
    const prisma = getPrisma();
    prisma.$transaction(async (trx) => {
        trx.dogImage.delete({
            where: {
                id: pictureId
            }
        })
    })
}

export async function updatePicture(pictureToUpdate: {
    id: number,
    dogId?: number,
    path?: string
}, isPrimary: boolean = false): Promise<void> {
    const prisma = getPrisma();
    prisma.$transaction(async (trx) => {
        trx.dogImage.update({
            data: pictureToUpdate,
            where: {
                id: pictureToUpdate.id
            }
        });
        if (isPrimary) {
            if (pictureToUpdate.dogId === undefined) {
                throw Error("No dogId was given");
            }
            const dog = await getDog(pictureToUpdate!.dogId);
            if (dog === null) {
                throw Error("Given dog not exist");
            }
            dog.primaryImgId = pictureToUpdate.id;
            trx.dog.update({
                data: dog,
                where: {
                    id: dog.id
                }
            })
        }
    });
}

export async function listDogPictures(dogId: number) {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return trx.dogImage.findMany({
            where: {
                dogId: dogId
            }
        });
    })
}

export async function getDogProfilePicture(dogId: number) {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        const dog = await getDog(dogId);
        if (dog === null) {
            throw Error("Given dogId does not exist");
        }
        return trx.dogImage.findFirst({
            where: {
                id: dog!.primaryImgId
            }
        })
    })
}
