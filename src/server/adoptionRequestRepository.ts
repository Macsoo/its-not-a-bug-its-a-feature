'use server';

import {PrismaClient} from '@prisma/client';
import type {AdoptionRequest} from '@prisma/client';

export async function addRequest(request: { userId: string, dogId: number }): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        const testing = await trx.adoptionRequest.findFirst({
            where: {
                userId: request.userId,
                dogId: request.dogId,
            }
        })
        if (testing !== null) {
            throw Error("Adoption already exists");
        }
        await trx.adoptionRequest.create({
            data: {
                userId: request.userId,
                dogId: request.dogId,
                requestDate: new Date
            }
        })
    })
}

export async function getRequest(id: number): Promise<AdoptionRequest | null> {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findFirst({
            where: {
                id: id,
            }
        });
    });
}

export async function getDogRequests(dogId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany({
            where: {
                dogId: dogId,
            }
        })
    })
}

export async function getUserRequests(userId: string) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany({
            where: {
                userId: userId,
            },
            include: {
                dog: true
            }
        })
    })
}

export async function listAllRequest() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany({
            include: {
                dog: true,
                user: true,
            }
        });
    })
}

export async function deleteRequestById(id: number): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        await trx.adoptionRequest.delete({
            where: {
                id: id,
            }
        })
    })
}

export async function deleteRequestsByUser(userId: string): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        await trx.adoptionRequest.deleteMany({
            where: {
                userId: userId,
            }
        })
    })
}

export async function deleteRequestsByDogId(dogId: number): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        await trx.adoptionRequest.deleteMany({
            where: {
                dogId: dogId,
            }
        })
    })
}

export async function updateRequest(request: {
    id: number,
    userId?: string,
    dogId?: number,
    requestDate?: Date,
    approved?: boolean
}): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        await trx.adoptionRequest.update({
            data: request,
            where: {
                id: request.id,
            }
        });
    });
}

export async function approveRequest(requestId: number): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        const foundRequest = await trx.adoptionRequest.findFirst({
            where: {
                id: requestId,
            }
        });
        if (foundRequest === null) {
            throw Error('Request not found');
        }
        await trx.dog.update({
            data: {
                adopted: true,
            },
            where: {
                id: foundRequest.dogId,
            }
        });
        await trx.adoptionRequest.updateMany({
            data: {
                approved: true
            },
            where: {
                AND: [
                    {
                        dogId: foundRequest.dogId,
                    },
                    {
                        id: foundRequest.id
                    }
                ]
            }
        });
        await trx.adoptionRequest.updateMany({
            data: {
                approved: false
            },
            where: {
                AND: [
                    {
                        dogId: foundRequest.dogId,
                    },
                    {
                        id: {
                            not: foundRequest.id
                        }
                    }
                ]
            }
        });
    })
}

export async function rejectRequest(requestId: number): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (trx) => {
        await trx.adoptionRequest.update({
            data: {
                approved: false,
            },
            where: {
                id: requestId,
            }
        });
    })
}