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
                        <h2>Jogosultság: {session.isAdmin() ? "Admin" : "Felhasználó"}</h2>
                        {session.isAdmin() && (
                            <>
                            <Link href="/add_dog"><button>Új Kutya Hozzáadása</button></Link>
                            </>
                        )}
                    </div>
                    <div className={`card w-full`}>
                        <h2>{session.isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                        {session.isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={session.user?.id}/>}
                    </div>
                </>}
        </div>
    );
}