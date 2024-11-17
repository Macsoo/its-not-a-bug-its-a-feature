import type { User } from '@supabase/supabase-js';
import {createContext, Dispatch, SetStateAction} from "react";

export class Session {
    public readonly user?: User;
    public readonly setUser?: Dispatch<SetStateAction<User | undefined>>;

    constructor(user?: User, setUser?: React.Dispatch<React.SetStateAction<User | undefined>>) {
        this.setUser = setUser;
        this.user = user;
    }
    public isSignedIn(): boolean {
        return this.user !== undefined;
    }
    public isAdmin(): boolean {
        if (this.user === undefined) return false;
        return this.user.app_metadata["admin"] === true;
    }
    public isUser(): boolean {
        if (this.user === undefined) return false;
        return this.user.app_metadata["admin"] !== true;
    }
}

export const SessionContext = createContext<Session>(new Session());