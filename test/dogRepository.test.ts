import {Gender, PrismaClient} from '@prisma/client';
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {
    addDog,
    getDog,
    listAllDogs,
    deleteDog,
    updateDog,
    adoptDog,
    addPictures
} from "../src/server/dogRepository";
import {PrismaTestingHelper} from '@chax-at/transactional-prisma-testing';

const origPrisma = new PrismaClient({log: ["query"]});
const prismaProxy = new PrismaTestingHelper(origPrisma);
const prisma = prismaProxy.getProxyClient();

describe('Dog service unit tests', () => {
    beforeAll(async () => {
        await prisma.$connect();
        await prismaProxy.startNewTransaction({
            timeout: 10000
        });
        await prisma.adoptionRequest.deleteMany();
        await prisma.dogImage.updateMany({
            data: {
                dogId: null,
            }
        });
        await prisma.dog.deleteMany();
        await prisma.dogImage.deleteMany();
    });

    afterAll(async () => {
        prismaProxy.rollbackCurrentTransaction();
        await prisma.$disconnect();
    });

    it('Should create a dog and its corresponding image, then retrieve it', async () => {
        const params = {
            chipId: '123456789ABCDF',
            name: 'BonBon',
            age: 8,
            gender: Gender.Male,
            breed: 'Goldi',
            description: 'She is a friendly girl, some might say she is a princess',
            adopted: false,
            imgPath: '..',
        };
        await addDog(params);
        const createdDog = await prisma.dog.findFirst({
            include: {primaryImg: true},
        });

        expect(createdDog).not.toBeNull();
        expect(createdDog?.name).toBe(params.name);
        expect(createdDog?.primaryImg?.path).toBe(params.imgPath);

        const createdDogImage = await prisma.dogImage.findFirst({
            where: {id: createdDog?.primaryImgId},
        });

        expect(createdDogImage).not.toBeNull();
        expect(createdDogImage?.dogId).toBe(createdDog?.id);

        const retrievedDog = await getDog(createdDog!.id);
        expect(retrievedDog).not.toBeNull();
        expect(retrievedDog?.id).toBe(createdDog?.id);
        expect(retrievedDog?.name).toBe(createdDog?.name);
    });

    it('Should list all dogs', async () => {
        const dogs = await listAllDogs();
        expect(Array.isArray(dogs)).toBe(true);
        expect(dogs.length).toBeGreaterThan(0);
    });

    it('Should update a dog', async () => {
        const dogToUpdate = await prisma.dog.findFirst({
            where: {
                chipId: '123456789ABCDF'
            }
        });
        const updateParams = {
            id: dogToUpdate!.id,
            name: 'Updated Name',
            age: 5,
        };
        await updateDog(updateParams);
        const updatedDog = await prisma.dog.findFirst({
            where: {id: dogToUpdate!.id},
        });

        expect(updatedDog?.name).toBe('Updated Name');
        expect(updatedDog?.age).toBe(5);
    });

    it('Should adopt a dog', async () => {
        const dogToAdopt = await prisma.dog.findFirst({
            where: {
                chipId: '123456789ABCDF'
            }
        });
        await adoptDog(dogToAdopt!.id);
        const adoptedDog = await prisma.dog.findFirst({
            where: {id: dogToAdopt!.id},
        });

        expect(adoptedDog?.adopted).toBe(true);
    });

    it('Should add pictures for a dog', async () => {
        const dogToUpdate = await prisma.dog.findFirst({
            where: {
                chipId: '123456789ABCDF'
            }
        });
        const pictures = ['path/to/pic1.jpg', 'path/to/pic2.jpg'];
        await addPictures(dogToUpdate!.id, pictures);
        const dogImages = await prisma.dogImage.findMany({
            where: {dogId: dogToUpdate!.id},
        });

        expect(dogImages.length).toBe(3);
    });

    it('Should delete a dog', async () => {
        const dogToDelete = await prisma.dog.findFirst({
            where: {
                chipId: '123456789ABCDF'
            }
        });
        await deleteDog(dogToDelete!.id);
        const deletedDog = await prisma.dog.findFirst({
            where: {
                id: dogToDelete!.id
            }
        });

        expect(deletedDog).toBeNull();
    });
});
