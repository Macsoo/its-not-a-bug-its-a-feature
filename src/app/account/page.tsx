'use client';
import "../globals.css";

import {RequestListAdmin, RequestListUser} from "@/components/requestList";
import {useContext} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
    const router = useRouter();
    const session = useContext(SessionContext);
    if (!session.isSignedIn())
        router.push('/login');
    return (
        <div className="content">
            {session.isSignedIn() &&
                <>
                    <div className="card">
                        <h2>{session.isAdmin() ? "Műveletek:" : "Adataim:"}</h2>
                        {session.isAdmin() && (
                            <div className={`flex justify-center items-center`}>
                            <Link href="/add_dog"><button>Új Kutya Hozzáadása</button></Link>
                            </div>
                        )}
                    </div>
                    <div className={`card `}>
                        <h2>{session.isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                            {session.isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={session.user?.id}/>}

                    </div>
                </>}
        </div>
    );
}