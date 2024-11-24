'use server';

import {createServer} from '@/server/supabase';
import {User} from "@supabase/supabase-js";
import {getPrisma} from "@/utils";
import {JsonObject} from "type-fest";

export async function registerUser(email: string, password: string) {
    const supabase = await createServer();
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error || data.session || !data.user) {
        return "Hiba történt a regisztráció során. Már van regisztrálva az email?";
    }
    return "";
}

export async function logInUser(email: string, password: string): Promise<User | null> {
    const supabase = await createServer();
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error || !data.session) {
        console.log(error);
        return null;
    }
    return data.user;
}

export async function getAllUsers() {
    const prisma = getPrisma();
    return prisma.$transaction(async (trx) => {
        const users = await trx.users.findMany({
            select: {
                id: true,
                email: true,
                raw_app_meta_data: true,
            },
        });

        return users.map(user => ({
            id: user.id,
            email: user.email as string,
            isAdmin: (user.raw_app_meta_data as JsonObject)?.admin === true,
        }));
    });
}
