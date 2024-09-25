import {isAdmin, isSignedIn, isUser} from "@/components/roles";

export function DogsButtons() {
    return(
        <>
            {isSignedIn() && (
                <div className={`flex flex-col gap-5 items-center`}>
                    {isUser() && (
                        <button id="adoptButton">Adoptálás</button>
                    )}
                    {isAdmin() && (
                        <div className="flex flex-col gap-5 items-center">
                            <button id="editDogButton">Szerkesztés</button>
                            <button id="deleteDogButton">Törlés</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}