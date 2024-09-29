import React from 'react';

export function useServerAction<T>(serverAction: () => Promise<T>): void {
    React.useEffect(() => {
        (async () => {
            await serverAction();
        })();
    }, []);
}