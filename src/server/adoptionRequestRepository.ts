'use server';

import {PrismaClient} from '@prisma/client';
import type {AdoptionRequest} from '@prisma/client';

export async function addRequest(request: { userId: number, dogId: number }): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.create({
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

export async function getUserRequests(userId: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany({
            where: {
                userId: userId,
            }
        })
    })
}

export async function listAllRequest() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany();
    })
}

export async function deleteRequestById(id: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.delete({
            where: {
                id: id,
            }
        })
    })
}

export async function deleteRequestsByUser(userId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.deleteMany({
            where: {
                userId: userId,
            }
        })
    })
}

export async function deleteRequestsByDogId(dogId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.deleteMany({
            where: {
                dogId: dogId,
            }
        })
    })
}

export async function updateRequest(request: {
    id: number,
    userId?: number,
    dogId?: number,
    requestDate?: Date,
    approved?: boolean
}): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.update({
            data: request,
            where: {
                id: request.id,
            }
        });
    });
}

export async function requestAdoption(userId: number, dogId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.create({
            data: {
                userId: userId,
                dogId: dogId,
                requestDate: new Date(),
            }
        })
    })
}

export async function approveRequest(requestId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        const foundRequest = await trx.adoptionRequest.findFirst({
            where: {
                id: requestId,
            }
        });
        if (foundRequest === null) {
            throw Error('Request not found');
        }
        trx.dog.update({
            data: {
                adopted: true,
            },
            where: {
                id: requestId,
            }
        });
        trx.adoptionRequest.deleteMany({
            where: {
                dogId: foundRequest.dogId,
            }
        })
    })
}

export async function rejectRequest(requestId: number): Promise<void> {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.delete({
            where: {
                id: requestId,
            }
        });
    })
}