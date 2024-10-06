import {Gender, PrismaClient} from '@prisma/client';
import {expect, test} from "@jest/globals";
import {
    addDog,
    adoptDog,
    deleteDog,
    getDog,
    listAllDogs,
    updateDog
} from "../src/server/dogRepository";

const prisma = new PrismaClient();
const mockDog = {
    chipId: 'abcgfhtyujkilot',
    name: 'BonBon',
    age: 8,
    gender: Gender.Female,
    breed: 'Goldi',
    description: "She is a good girl, some might call it Princess",
    adopted: false,
    imgPath: '..',
}
const mockDog2 = {
    chipId: 'abcgfhtyujkilot',
    name: 'Spuri',
    age: 3,
    gender: Gender.Male,
    breed: 'Goldi',
    description: "He is a good girl, some might call it Prince",
    adopted: true,
    imgPath: '../..',
}

test('Testing dogRepository', () => {
    prisma.$transaction(async () => {
        expect(await addDog(mockDog)).toReturn();
        const returnedMockDog = await listAllDogs();
        expect(returnedMockDog).toContain(mockDog);
        expect(await addDog(mockDog2)).toReturn();
        const returnedDogs = await listAllDogs();
        expect(returnedDogs).toContain(mockDog);
        expect(returnedDogs).not.toEqual(returnedMockDog);
        const justOneDog = await getDog(returnedDogs[-1].id);
        expect(justOneDog).toContain(mockDog2);
        if (justOneDog === null) {
            throw Error("Fail");
        }
        const updateParams = {
            id: justOneDog.id,
            chipID: justOneDog.chipId,
            name: justOneDog.name,
            age: justOneDog.age - 1,
            gender: justOneDog.gender,
            breed: justOneDog.breed,
            description: justOneDog.description,
            adopted: justOneDog.adopted
        }
        await updateDog(updateParams);
        const updatedMockDog2 = await getDog(justOneDog.id);
        expect(updatedMockDog2).not.toEqual(mockDog2);
        await deleteDog(justOneDog.id);
        const afterDeleteDogs = await listAllDogs();
        expect(afterDeleteDogs).toContain(mockDog);
        expect(afterDeleteDogs).not.toContain(updatedMockDog2);
        expect(returnedMockDog[-1].adopted).toBe(false);
        await adoptDog(returnedMockDog[-1].id);
        const yetAnotherReturn = await getDog(returnedMockDog[-1].id);
        if (yetAnotherReturn === null) {
            throw Error("Fail");
        }
        expect(yetAnotherReturn.adopted).toEqual(true);
        throw Error("Succeed");
    })
})
