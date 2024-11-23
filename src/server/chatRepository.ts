'use server';

import {getPrisma} from "@/utils";

export async function sendMessage(fromUser: string, toUser: string, message: string): Promise<void> {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        await trx.chat.create({
            data: {
                fromUser: fromUser,
                toUser: toUser,
                seen: false,
                createdAt: new Date(),
                message: message,
            }
        });
    })
}

export async function seenMessage(id: number): Promise<void> {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        await trx.chat.update({
            where: {
                id: id,
            },
            data: {
                seen: true,
            }
        })
    })
}

export async function getAllMessagesFromUser(user: string) {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return (await trx.chat.findMany({
            where: {
                OR: [
                    {
                        fromUser: user,
                    },
                    {
                        toUser: user,
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                message: true,
                fromUser: true,
            },
            take: 50,
        }));
    })
}

export async function getUnseenMessagesFromUser(user: string) {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        return (await trx.chat.findMany({
            where: {
                OR: [
                    {
                        fromUser: user,
                    },
                    {
                        toUser: user,
                    }
                ],
                AND: {
                    seen: false,
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                message: true,
                fromUser: true,
            },
        }));
    })
}

