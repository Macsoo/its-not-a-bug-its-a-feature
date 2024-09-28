'use server';

import {Dog, PrismaClient, User} from '@prisma/client';
import type {AdoptionRequest} from '@prisma/client';

export async function addRequest(request: AdoptionRequest) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.create({
            data: request,
        })
    })
}

export async function getRequest(id: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findFirst({
            where: {
                id: id,
            }
        });
    });
}

export async function listAllRequest() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findMany();
    })
}

export async function deleteRequest(id: number) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.delete({
            where: {
                id: id,
            }
        })
    })
}

export async function updateAdoption(request: {
    id: number,
    userId?: number,
    dogId?: number,
    requestDate?: Date,
    approved?: boolean
}) {
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

export async function requestAdoption(user: User, dog: Dog) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.create({
            data: {
                userId: user.id,
                dogId: dog.id,
                requestDate: new Date(),
            }
        })
    })
}

export async function approveRequest(request: AdoptionRequest) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        const foundRequest = await trx.adoptionRequest.findFirst({
            where: {
                id: request.id,
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
                id: request.id,
            }
        });
        trx.adoptionRequest.deleteMany({
            where: {
                dogId: foundRequest.dogId,
            }
        })
    })
}

export async function rejectRequest(request: AdoptionRequest) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.delete({
            where: {
                id: request.id,
            }
        });
    })
}