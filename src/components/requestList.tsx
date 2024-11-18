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
        <div className={`requestTableContainer`}>
        <table className="requestTable">
            <thead>
            <tr>
                <th className={`min-w-[110px] max-w-[130px]`}>Kérelem leadásának ideje</th>
                <th className={`min-w-[100px] man-w-[100px]`}>Kutya Neve</th>
                <th className={`min-w-[110px] max-w-[200px]`}>Státusz</th>
            </tr>
            </thead>
            <tbody>
            {userRequests.map((request) => (
                <tr key={request.id}>
                    <td>{request.requestDate.toDateString()}</td>
                    <td>
                        <Link href={`/dogs/${request.dogId}`}>{request.dog.name}</Link>
                    </td>
                    <td>
                        {request.approved === null
                            ? 'Eredményre vár'
                            : request.approved
                                ? 'Elfogadva'
                                : 'Elutasítva'}
                    </td>
                </tr>
            ))}
            </tbody>
        </table></div>
    );
}



// RequestListAdmin Component
export function RequestListAdmin() {
    const [pendingRequests, setPendingRequests] = useState<AdoptionRequestWithDogAndUser[]>([]);
    const [dialogState, setDialogState] = useState<{
        requestId: number | null,
        type: 'approve' | 'reject' | null
    }>({requestId: null, type: null});

    useServerAction(async () => {
        setPendingRequests(await listAllRequest());
    });

    const handleApprove = async (id: number) => {
        await approveRequest(id);
        setPendingRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, approved: true } : request
            )
        );
        setDialogState({ requestId: null, type: null });
    };

    const handleReject = async (id: number) => {
        await rejectRequest(id);
        setPendingRequests((prev) =>
            prev.map((request) =>
                request.id === id ? { ...request, approved: false } : request
            )
        );
        setDialogState({ requestId: null, type: null });
    };

    return (
        <>
            <div className={`requestTableContainer`}>
                <table className="requestTable">
                    <thead>
                    <tr>
                        <th className={`min-w-[110px] max-w-[130px]`}>Kérelem leadásának ideje</th>
                        <th className={`min-w-[100px] man-w-[100px]`}>Kutya neve</th>
                        <th className={`min-w-[100px] max-w-[200px]`}>Felhasználó<br/>e-mail</th>
                        <th className={`min-w-[100px] max-w-[110px]`}>Műveletek</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingRequests.filter((request) => {
                        if (request.approved == null) {
                            return request
                        }
                    }).map((request) => (
                        <tr key={request.id}>
                            <td> {request.requestDate.toDateString()} </td>
                            <td><Link href={`/dogs/${request.dogId}`}>{request.dog.name}</Link></td>
                            <td> {request.user.email} </td>
                            <td>
                                {request.approved == null && dialogState.requestId !== request.id && (
                                    <div className={`flex flex-col w-full items-center justify-center`}>
                                        <button id="adoptButton" onClick={() => setDialogState({
                                            requestId: request.id,
                                            type: 'approve'
                                        })}>Elfogad
                                        </button>
                                        <button id="deleteDogButton" onClick={() => setDialogState({
                                            requestId: request.id,
                                            type: 'reject'
                                        })}>Elutasít
                                        </button>
                                    </div>
                                )}
                                {dialogState.requestId === request.id && (
                                    <ConfirmDialog
                                        message={dialogState.type === 'approve' ? 'Biztosan elfogadod ezt a kérelmet?' : 'Biztosan elutasítod ezt a kérelmet?'}
                                        onConfirm={() => dialogState.type === 'approve' ? handleApprove(dialogState.requestId!) : handleReject(dialogState.requestId!)}
                                        onCancel={() => setDialogState({requestId: null, type: null})}
                                    />
                                )}
                                {
                                    request.approved !== null && (
                                        request.approved ? <span>Elfogadva</span> : <span>Elutasítva</span>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <h2>Elbírált kérvények</h2>
            <div className={`requestTableContainer`}>
                <table className="requestTable">
                    <thead>
                    <tr>
                        <th className={`min-w-[110px] max-w-[130px]`}>Kérelem leadásának ideje</th>
                        <th className={`min-w-[100px] man-w-[100px]`}>Kutya neve</th>
                        <th className={`min-w-[100px] max-w-[200px]`}>Felhasználó<br/>e-mail</th>
                        <th className={`min-w-[100px] max-w-[110px]`}>Állapot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingRequests.filter((request) => {
                        if (request.approved !== null) {
                            return request
                        }
                    }).map((request) => (
                        <tr key={request.id}>
                            <td> {request.requestDate.toDateString()} </td>
                            <td><Link href={`/dogs/${request.dogId}`}>{request.dog.name}</Link></td>
                            <td> {request.user.email} </td>
                            <td>
                                {
                                    request.approved !== null && (
                                        request.approved ? <span>Elfogadva</span> : <span>Elutasítva</span>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </>
            );
            }