import {isAdmin, isUser} from "@/components/roles";
import Link from "next/link";


export function UpdateButton({dog_id}: { dog_id: number }) {
    return (
        <>
            {isAdmin() && (
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
    return (
        <>
            {isAdmin() && (
                <div className="flex flex-col gap-5 items-center">
                    <button id="deleteDogButton">Törlés {dog_id}</button>
                </div>
            )}
        </>
    )
}

export function AdoptButton({dog_id}: { dog_id: number }) {
    return (
        <>
            {isUser() && (
                <button id="adoptButton">Adoptálás {dog_id}</button>
            )}
        </>
    )
}