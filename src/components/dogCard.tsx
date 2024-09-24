'use client';
import "@/app/globals.css";
import {isSignedIn, isAdmin, isUser} from "@/components/roles";


export default function DogCard() {
    const role = "admin"; //role can be admin/user/guest
    return (
        <div className="card-dog">
            <div>
                Role: {role}
            </div>
            <div id="dog-text" className={`flex flex-col items-center justify-around md:flex-row`}>
                <div>
                    Adatok
                </div>
                <div>
                    Leírás
                </div>
            </div>
            {isSignedIn({role: role}) && (
                <div>
                    {isUser({role: role}) && (
                        <button>Adoptálás</button>
                    )}
                    {isAdmin({role: role}) && (
                        <div className="flex flex-col gap-5">
                            <button>Szerkesztés</button>
                            <button>Törlés</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}