import Link from "next/link";
import {useContext, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {deleteDog} from "@/server/dogRepository";
import {addRequest} from "@/server/adoptionRequestRepository";
import {useRouter} from "next/navigation";


export function ConfirmDialog({message, onConfirm, onCancel}: {
    message: string,
    onConfirm: () => void,
    onCancel: () => void
}) {
    return (
        <div className="dialog">
            <div className="dialog-content">
                <p>{message}</p>
                <button onClick={onConfirm}>Igen</button>
                <button onClick={onCancel}>Nem</button>
            </div>
        </div>
    );
}

export function UpdateButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    return (
        <>
            {session.isAdmin() && (
                <div className="flex flex-col gap-5 items-center">
                    <Link href={`/dog_update/${dog_id}`}>
                        <button id="editDogButton">Szerkesztés</button>
                    </Link>
                </div>
            )}
        </>
    )
}

export function DeleteButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    const router = useRouter()

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        deleteDog(dog_id).then(() => {
            setIsDialogOpen(false);
            router.push(`/dogs`);
        });
    };


    return (
        <>
            {session.isAdmin() && (
                <div className="flex flex-col gap-5 items-center">
                    {!isDialogOpen && (
                        <button id="deleteDogButton" onClick={() => setIsDialogOpen(true)}>Törlés</button>
                    )
                    }

                    {isDialogOpen && (
                        <ConfirmDialog
                            message="Biztosan törölni szeretnéd?"
                            onConfirm={handleDelete}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export function AdoptButton({dog_id}: { dog_id: number }) {
    const session = useContext(SessionContext);
    const router = useRouter()

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAdopt = () => {
        addRequest({userId: session.user!.id, dogId: dog_id}).then(() => {
            setIsDialogOpen(false);
            router.push(`/account`);
        } );
    };

    return (
        <>
            {session.isUser() && (
                <>
                    {!isDialogOpen && (
                        <button id="adoptButton" onClick={() => setIsDialogOpen(true)}>Adoptálás</button>
                    )
                    }

                    {isDialogOpen && (
                        <ConfirmDialog
                            message="Biztosan adoptálni szeretnéd?"
                            onConfirm={handleAdopt}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    )}
                </>
            )}
        </>
    )
}