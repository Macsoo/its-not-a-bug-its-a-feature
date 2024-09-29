'use server';

import {createClient} from '@supabase/supabase-js';
import {redirect} from "next/navigation";

export async function registerUser(email: string, password: string) {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    )
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error || data.session || !data.user) {
        redirect('/500')
    }
    redirect('/')
}

export async function logIn(email: string, password: string) {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    )
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error || !data.session) {
        redirect('/500')
    }
    redirect('/');
}

export async function refreshToken() {}