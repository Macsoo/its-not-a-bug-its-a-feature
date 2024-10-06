import Link from "next/link";
import {useContext} from "react";
import {SessionContext} from "@/components/sessionContext";
import {deleteDog} from "@/server/dogRepository";
import {addRequest} from "@/server/adoptionRequestRepository";


export function UpdateButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    return (
        <>
            {session.isAdmin() && (
                <div className="flex flex-col gap-5 items-center">
                    <Link href={`/dogs/dog_update/${dog_id}`}>
                        <button id="editDogButton">Szerkesztés</button>
                    </Link>
                </div>
            )}
        </>
    )
}

export function DeleteButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    return (
        <>
            {session.isAdmin() && (
                <div className="flex flex-col gap-5 items-center">
                    <button id="deleteDogButton" onClick={() => deleteDog(dog_id)}>Törlés {dog_id}</button>
                </div>
            )}
        </>
    )
}

export function AdoptButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    return (
        <>
            {session.isUser() && (
                <button id="adoptButton" onClick={() => addRequest({ userId: session.user!.id, dogId: dog_id })}>Adoptálás {dog_id}</button>
            )}
        </>
    )
}