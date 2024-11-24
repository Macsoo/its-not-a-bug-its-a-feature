'use server';

import {createServer} from '@/server/supabase';
import {User} from "@supabase/supabase-js";
import {getPrisma} from "@/utils";

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
        return (await trx.users.findMany({
            select: {
                id: true,
                email: true,
            }
        })).map(item => ({ id: item.id, email: item.email as string }));
    })
}
