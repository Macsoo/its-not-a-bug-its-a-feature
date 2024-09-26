'use client';
import "../globals.css";

import {currentUserId, currentRole, isSignedIn} from "@/components/roles";

import {isAdmin, isUser} from "@/components/roles";
import {RequestListAdmin, RequestListUser} from "@/components/requestList";


export default function AccountPage() {
    return (
        <div className="content">
            {isSignedIn() && (
                <>
                    <div className="card">
                        <h2>Jogosultság: {currentRole}</h2>
                        {isUser() && (
                            <p>Felhasználói azonosítószám: {currentUserId}</p>
                        )}
                    </div>
                    <div className={`card w-full`}>
                        <h2>{isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                        {isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={currentUserId}/>}
                    </div>

                </>
            )}
        </div>
    );
}