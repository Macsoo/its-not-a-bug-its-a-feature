'use client';
import "../globals.css";

import {RequestListAdmin, RequestListUser} from "@/components/requestList";
import {useContext} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";

export default function AccountPage() {
    const router = useRouter();
    const session = useContext(SessionContext);
    if (!session.isSignedIn())
        router.push('/login');
    return (
        <div className="content">
            <div className="card">
                <p>{session.user?.email}</p>
                <h2>Jogosultság: {session.isAdmin() ? "Admin" : "Felhasználó"}</h2>
                {session.isUser() && (
                    <p>Felhasználói azonosítószám: {session.user?.id}</p>
                )}
            </div>
            <div className={`card w-full`}>
                <h2>{session.isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                {session.isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={101}/>}
            </div>
        </div>
    );
}