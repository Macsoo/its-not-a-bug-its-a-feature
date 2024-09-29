'use server';

import {createServer} from '@/server/supabase';
import {redirect} from "next/navigation";

export async function registerUser(email: string, password: string) {
    const supabase = createServer();
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error || data.session || !data.user) {
        return "Hiba történt a regisztráció során. Már van regisztrálva az email?";
    }
    return "";
}

export async function logInUser(email: string, password: string): Promise<string> {
    const supabase = createServer();
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error || !data.session) {
        return "Hiba történt a bejelentkezés során. Talán téves jelszó?";
    }
    redirect('/');
}