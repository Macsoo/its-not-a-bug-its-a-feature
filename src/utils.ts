import React from 'react';
import {PrismaClient} from "@prisma/client";

export function useServerAction<T>(serverAction: () => Promise<T>): void {
    React.useEffect(() => {
        (async () => {
            await serverAction();
        })();
    }, [serverAction]);
}

export function getPrisma() {
    return globalThis.prisma ?? new PrismaClient();
}