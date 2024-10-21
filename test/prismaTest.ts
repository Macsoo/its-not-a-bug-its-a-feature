import {PrismaClient} from '@prisma/client';
import {afterAll, beforeAll, describe} from "@jest/globals";
import {PrismaTestingHelper} from '@chax-at/transactional-prisma-testing';
import {Global} from "@jest/types";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export function prismaTest(blockName: Global.BlockNameLike, blockFn: ((prisma: PrismaClient) => void)) {
    const origPrisma = new PrismaClient();
    const prismaProxy = new PrismaTestingHelper(origPrisma);
    const prisma = prismaProxy.getProxyClient();
    return describe('Prisma database test', () => {
        beforeAll(async () => {
            globalThis.prisma = prisma;
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
            globalThis.prisma = undefined;
        });
        describe(blockName, ((prisma) => () => blockFn(prisma))(prisma));
    });
}
