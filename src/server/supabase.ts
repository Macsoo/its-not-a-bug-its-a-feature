'use server';
import {createBrowserClient, createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

export async function getUser() {
    const supabase = createBrowserClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
    )
    const {data, error} = await supabase.auth.getUser();
    if (error || !data.user) {
        return undefined;
    } else {
        return data.user;
    }
}

export async function createServer() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}