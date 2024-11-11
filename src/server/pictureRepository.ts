'use server';

import {getPrisma} from "@/utils";
import {Dog, DogImage} from "@prisma/client";
import {getDog} from "@/server/dogRepository";
import {createAdminServer, createServer} from "@/server/supabase";

const SUPABASE_BUCKET = 'dogimages';

export async function deletePicture(path: string): Promise<void> {
    const supabase = await createAdminServer();
    const prisma = getPrisma();
    let err = await prisma.$transaction(async (trx) => {
        const picture: DogImage | null = await trx.dogImage.findFirst({
            where: {
                path: path
            }
        });
        if (picture === null || picture === undefined) {
            return "Picture does not exist.";
        }
        await trx.dogImage.delete({
            where: {
                id: picture.id,
            }
        });
    });
    if (err !== undefined) {
        return Promise.reject(err);
    }
    err = await prisma.$transaction(async (trx) => {
        const pictureCount: number = await trx.dogImage.count({
            where: {
                path: path
            }
        });
        if (pictureCount > 0) return;
        const {data, error} = await supabase.storage.from(SUPABASE_BUCKET).remove([path]);
        if (data === null || error !== null) {
            return error?.message;
        }
    });
    if (err !== undefined) {
        return Promise.reject(err);
    }
}

export async function getImageUrl(path: string): Promise<string> {
    const supabase = await createServer();
    const prisma = getPrisma();
    const imageUrl = await prisma.$transaction(async (trx) =>
        await new Promise<string>(async (resolve, reject) => {
            const picture: DogImage | null = await trx.dogImage.findFirst({
                where: {
                    path: path,
                }
            });
            if (picture === null || picture === undefined) {
                reject("DogImage with given ID not found.");
                return;
            }
            const {data: {publicUrl}} = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(picture.path);
            resolve(publicUrl);
        }));
    return imageUrl;
}

export async function uploadPicture(formData: FormData): Promise<string> {
    const dogId = parseInt(formData.get("dogId") as string);
    console.warn("dogId", dogId);
    const dataFile = formData.get("data") as File;
    console.warn("data", dataFile);
    const supabase = await createAdminServer();
    const uuid = crypto.randomUUID();
    const prisma = getPrisma();
    const err = await prisma.$transaction(async (trx) => {
        const dog: Dog | null = await trx.dog.findUnique({
            where: {
                id: dogId,
            }
        });
        if (dog === null || dog === undefined) {
            return "Dog doesn't exist.";
        }
        const {error} = await supabase.storage.from(SUPABASE_BUCKET).upload(uuid, dataFile);
        if (error !== null) {
            return error;
        }
        await trx.dogImage.create({
            data: {
                dogId: dog.id,
                path: uuid,
            }
        });
    });
    if (err !== undefined)
        return Promise.reject(err);
    return uuid;
}

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
