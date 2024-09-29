import "../globals.css";

import {currentUserId, currentRole} from "@/components/roles";

import {isAdmin, isUser} from "@/components/roles";
import {RequestListAdmin, RequestListUser} from "@/components/requestList";
import {createServer} from "@/server/supabase";
import {redirect} from "next/navigation";

export default async function AccountPage() {
    const supabase = createServer();
    const {data, error} = await supabase.auth.getUser();
    if (error || !data.user) {
        redirect("/login");
    }
    return (
        <div className="content">
            <div className="card">
                <p>{data.user.email}</p>
                <h2>Jogosultság: {currentRole}</h2>
                {isUser() && (
                    <p>Felhasználói azonosítószám: {currentUserId}</p>
                )}
            </div>
            <div className={`card w-full`}>
                <h2>{isAdmin() ? "Felhasználók által leadott kérvények:" : "Leadott kérvényeim:"}</h2>
                {isAdmin() ? <RequestListAdmin/> : <RequestListUser user_id={currentUserId}/>}
            </div>
        </div>
    );
}