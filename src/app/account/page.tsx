'use client';
import "../globals.css";

import {RequestListAdmin, RequestListUser} from "@/components/requestList";
import {useContext, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import Link from "next/link";
import UserList from "@/components/userList";

export default function AccountPage() {
    const router = useRouter();
    const session = useContext(SessionContext);

    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);

    if (!session.isSignedIn())
        router.push('/login');
    return (
        <div className="content">
            {session.isSignedIn() &&
                <>
                    <div className="card max-sm:flex max-sm:flex-col max-sm:items-center">
                        <h2>{session.isAdmin() ? "Műveletek:" : "Adataim:"}</h2>
                        {session.isAdmin() && (
                            <div className={`flex flex-row gap-5 max-md:flex-col max-md:gap-2.5 items-center`}>
                                <button onClick={()=>{
                                    setShowRequests(true);
                                    setShowUsers(false);
                                }}>Kérvények Kezelése</button>
                                <button onClick={()=>{
                                    setShowRequests(false);
                                    setShowUsers(true);
                                }}>Felhasználók Szerkesztése</button>
                                <Link href="/add_dog">
                                    <button>Új Kutya Hozzáadása</button>
                                </Link>
                            </div>
                        )}
                    </div>
                    {showRequests && (<div className={`card`}>
                        <h2 className={"max-sm:text-center"}>{session.isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                        {session.isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={session.user?.id}/>}

                    </div>)}
                    {showUsers && session.isAdmin() && (
                            <UserList/>
                    )}

                </>}
        </div>
    );
}