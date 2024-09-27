'use server';

import {Dog, PrismaClient, User} from '@prisma/client';
import type {AdoptionRequest} from '@prisma/client';

export async function add(request: AdoptionRequest) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.create({
            data: request,
        })
    })
}

export async function get(id: number) {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        return trx.adoptionRequest.findFirst({
            where: {
                id: id,
            }
        });
    });
}

export async function list() {
    const prisma = new PrismaClient();
    return prisma.$transaction(async (trx) => {
        trx.adoptionRequest.findMany();
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

export async function updateAdoption(request: AdoptionRequest) {
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

export async function request(user: User, dog: Dog) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        // const request = await
        trx.adoptionRequest.create({
            data: {
                userId: user.id,
                dogId: dog.id,
                requestDate: new Date(),
            }
        })
        // if (request === null || request === undefined) {
        //     return;
        // }
        // trx.dog.update({
        //     data: {
        //         adoptionRequests: request.id
        //     },
        //     where: {
        //         id: dog.id
        //     }
        // })
        // trx.user.update({
        //     data: {
        //         adoptionRequests: request.id
        //     },
        //     where: {
        //         id: user.id
        //     }
        // })
    })
}

export async function approve(request: AdoptionRequest) {
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
                dogId: foundRequest.id,
            }
        })
    })
}

export async function reject(request: AdoptionRequest) {
    const prisma = new PrismaClient();
    prisma.$transaction(async (trx) => {
        trx.adoptionRequest.delete({
            where: {
                id: request.id,
            }
        });
    })
}