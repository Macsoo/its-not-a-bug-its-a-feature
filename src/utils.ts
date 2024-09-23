import React from 'react';

export function useServerAction<T>(serverAction: () => Promise<T>, setResult?: React.Dispatch<React.SetStateAction<T>>): void {
    React.useEffect(() => {
        if (setResult === undefined) {
            (async () => {
                await serverAction();
            })();
        } else {
            (async () => {
                setResult(await serverAction());
            })();
        }
    });
}