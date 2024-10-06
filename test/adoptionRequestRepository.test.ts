import {Gender, PrismaClient, users, Dog, AdoptionRequest} from '@prisma/client';
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {
    addRequest,
    getRequest,
    getDogRequests,
    getUserRequests,
    listAllRequest,
    // deleteRequestById,
    // deleteRequestsByUser,
    // deleteRequestsByDogId,
    updateRequest,
    // approveRequest,
    // rejectRequest
} from "../src/server/adoptionRequestRepository";
import {
    addDog,
} from "../src/server/dogRepository";
import {PrismaTestingHelper} from "@chax-at/transactional-prisma-testing";

const origPrisma = new PrismaClient();
const prismaProxy = new PrismaTestingHelper(origPrisma);
const prisma = prismaProxy.getProxyClient();

describe('Adoption request unit test', () => {
    let testUser: users;
    let testDog: Dog;
    let testRequest: AdoptionRequest;

    beforeAll(async () => {
        await prisma.$connect();
        await prismaProxy.startNewTransaction();
        await prisma.adoptionRequest.deleteMany();
        await prisma.dogImage.updateMany({
            data: {
                dogId: null,
            }
        });
        await prisma.dog.deleteMany();
        await prisma.dogImage.deleteMany();
        testUser = await prisma.users.findFirstOrThrow({
            where: {
                email: "admin@inabiaf.org"
            }
        });
        const params = {
            chipId: '123456789AAAAA',
            name: 'Zorro',
            age: 1,
            gender: Gender.Male,
            breed: 'German Shepherd',
            description: 'A too friendly dog',
            adopted: false,
            imgPath: '..'
        };
        await addDog(params)
        testDog = await prisma.dog.findFirstOrThrow();
    });

    afterAll(async () => {
        prismaProxy.rollbackCurrentTransaction();
        await prisma.$disconnect();
    });

    it('Should create an adoption request', async () => {
        await addRequest({userId: testUser.id, dogId: testDog.id});
        const request = await prisma.adoptionRequest.findFirstOrThrow({
            where: {
                userId: testUser.id,
                dogId: testDog.id
            },
        });

        expect(request).not.toBeNull();
        testRequest = request!;
    });

    it('Should get an adoption request by id', async () => {
        const request = await getRequest(testRequest.id);
        expect(request).not.toBeNull();
        expect(request?.id).toBe(testRequest.id);
    });

    it('Should get all adoption requests for a dog', async () => {
        const requests = await getDogRequests(testDog.id);
        expect(requests.length).toBeGreaterThan(0);
        expect(requests[0].dogId).toBe(testDog.id);
    });

    it('Should get all adoption requests for a user', async () => {
        const requests = await getUserRequests(testUser.id);
        expect(requests.length).toBeGreaterThan(0);
        expect(requests[0].userId).toBe(testUser.id);
    });

    it('Should list all adoption requests', async () => {
        const requests = await listAllRequest();
        expect(requests.length).toBeGreaterThan(0);
        expect(requests[0].dogId).toBe(testDog.id);
        expect(requests[0].userId).toBe(testUser.id);
    });

    it('Should update an adoption request', async () => {
        const newDate = new Date('2025-01-01');
        await updateRequest({
            id: testRequest.id,
            requestDate: newDate,
        });

        const updatedRequest = await prisma.adoptionRequest.findFirstOrThrow({
            where: {id: testRequest.id},
        });

        expect(updatedRequest?.requestDate).toEqual(newDate);
        testRequest = updatedRequest;
    });

    // it('Should approve an adoption request', async () => {
    //     await approveRequest(testRequest.id);
    //
    //     const dog = await prisma.dog.findFirst({
    //         where: {id: testDog.id},
    //     });
    //
    //     expect(dog?.adopted).toBe(true);
    // });

    // it('Should reject and delete an adoption request', async () => {
    //     await rejectRequest(testRequest.id);
    //
    //     const deletedRequest = await prisma.adoptionRequest.findFirst({
    //         where: {id: testRequest.id},
    //     });
    //
    //     expect(deletedRequest).toBeNull();
    // });

    // it('Should delete an adoption request by id', async () => {
    //     const newRequest = await prisma.adoptionRequest.create({
    //         data: {
    //             userId: testUser.id,
    //             dogId: testDog.id,
    //             requestDate: new Date(),
    //         },
    //     });
    //
    //     await deleteRequestById(newRequest.id);
    //
    //     const deletedRequest = await prisma.adoptionRequest.findFirst({
    //         where: {id: newRequest.id},
    //     });
    //
    //     expect(deletedRequest).toBeNull();
    // });

    // it('Should delete all requests for a user', async () => {
    //     await deleteRequestsByUser(testUser.id);
    //     const deletedRequests = await prisma.adoptionRequest.findMany({
    //         where: {userId: testUser.id},
    //     });
    //
    //     expect(deletedRequests.length).toBe(0);
    // });

    // it('Should delete all requests for a dog', async () => {
    //     await deleteRequestsByDogId(testDog.id);
    //     const deletedRequests = await prisma.adoptionRequest.findMany({
    //         where: {dogId: testDog.id},
    //     });
    //
    //     expect(deletedRequests.length).toBe(0);
    // });
});