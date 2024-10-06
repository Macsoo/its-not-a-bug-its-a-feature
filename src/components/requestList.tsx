'use client';
import {
    getUserRequests,
    listAllRequest,
    approveRequest,
    rejectRequest
} from "@/server/adoptionRequestRepository";
import {useServerAction} from "@/utils";
import {useState} from "react";
import {AdoptionRequest, Dog, users} from "@prisma/client";
import Link from "next/link";
import {ConfirmDialog} from "@/components/dogsButton";

type AdoptionRequestWithDog = AdoptionRequest & { dog: Dog };
type AdoptionRequestWithDogAndUser = AdoptionRequest & { dog: Dog, user: users };

export function RequestListUser({user_id}: {
    user_id?: string,
}) {
    const [userRequests, setUserRequests] = useState<AdoptionRequestWithDog[]>([]);
    useServerAction(async () => {
        setUserRequests(await getUserRequests(user_id!));
    });

    return (
        <table id="requestTable">
            <thead>
            <tr>
                <th className={`max-w-[60px]`}>ID</th>
                <th>Kérelem leadásának ideje</th>
                <th>Kutya Neve</th>
                <th>Státusz</th>
            </tr>
            </thead>
            <tbody>
            {userRequests.map((request) => (
                <tr key={request.id}>
                    <td> {request.requestDate.toDateString()} </td>
                    <td> {request.dog.name} </td>
                    <td> {request.approved === null ? 'Eredményre vár' : (request.approved ? 'Elfogadva' : 'Elutasítva')} </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// RequestListAdmin Component
export function RequestListAdmin() {
    const [pendingRequests, setPendingRequests] = useState<AdoptionRequestWithDogAndUser[]>([]);
    const [dialogState, setDialogState] = useState<{ requestId: number | null, type: 'approve' | 'reject' | null }>({ requestId: null, type: null });

    useServerAction(async () => {
        setPendingRequests(await listAllRequest());
    });

    const handleApprove = (id: number) => {
        approveRequest(id).then(() => {
            // Request state update or refresh logic
            setDialogState({ requestId: null, type: null });
        });
    };

    const handleReject = (id: number) => {
        rejectRequest(id).then(() => {
            // Request state update or refresh logic
            setDialogState({ requestId: null, type: null });
        });
    };

    return (
        <>
            <table id="requestTable">
                <thead>
                <tr>
                    <th className={`max-w-[60px]`}>ID</th>
                    <th className={`max-w-[130px]`}>Kérelem leadásának ideje</th>
                    <th className={`max-w-[100px]`}>Kutya azonosító</th>
                    <th className={`max-w-[120px]`}>Felhasználói azonosító</th>
                    <th className={`max-w-[200px]`}>Felhasználó<br />e-mail</th>
                    <th>Felhasználó telefonszám</th>
                    <th>Műveletek</th>
                </tr>
                </thead>
                <tbody>
                {pendingRequests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{new Date(request.requestDate).toDateString()}</td>
                        <td>
                            <Link href={`/dogs/${request.dogId}`}>{request.dogId}</Link>
                        </td>
                        <td>{request.user.email}</td>
                        <td>{request.user.phoneNumber}</td>
                        <td>
                            {!dialogState.requestId && (
                                <>
                                    <button id="adoptButton" onClick={() => setDialogState({ requestId: request.id, type: 'approve' })}>Elfogad</button>
                                    <button id="deleteDogButton" onClick={() => setDialogState({ requestId: request.id, type: 'reject' })}>Elutasít</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {dialogState.requestId && (
                <ConfirmDialog
                    message={dialogState.type === 'approve' ? 'Biztosan elfogadod ezt a kérelmet?' : 'Biztosan elutasítod ezt a kérelmet?'}
                    onConfirm={() => dialogState.type === 'approve' ? handleApprove(dialogState.requestId!) : handleReject(dialogState.requestId!)}
                    onCancel={() => setDialogState({ requestId: null, type: null })}
                />
            )}
        </>
    );
}