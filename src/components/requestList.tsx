'use client';
import {getUserRequests, listAllRequest, approveRequest, rejectRequest} from "@/server/adoptionRequestRepository";
import {useServerAction} from "@/utils";
import {useState} from "react";
import {AdoptionRequest, Dog, users} from "@prisma/client";
import Link from "next/link";

type AdoptionRequestWithDog = AdoptionRequest & { dog: Dog };
type AdoptionRequestWithDogAndUser = AdoptionRequest & { dog: Dog, user: users };

export function RequestListUser({user_id}: {
    user_id?:string,
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
                <th >Kérelem leadásának ideje</th>
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
    useServerAction(async () => {
        setPendingRequests(await listAllRequest());
    });

    return (
        <table id="requestTable">
            <thead>
            <tr>
                <th className={`max-w-[60px]`}>ID</th>
                <th className={`max-w-[130px]`}>Kérelem leadásának ideje</th>
                <th className={`max-w-[100px]`}>Kutya azonosító</th>
                <th className={`max-w-[120px]`}>Felhasználói azonosító</th>
                <th className={`max-w-[200px]`}>Felhasználó<br/>e-mail</th>
                <th>Felhasználó telefonszám</th>
                <th>Műveletek</th>
            </tr>
            </thead>
            <tbody>
            {pendingRequests.map((request) => (
                <tr key={request.id}>
                    <td> {request.requestDate.toDateString()} </td>
                    <td> <Link href={`/dogs/${request.dogId}`}></Link> </td>
                    <td> {request.user.email} </td>
                    <td>
                        <button id="adoptButton" onClick={() => approveRequest(request.id)}>Elfogad</button>
                        <button id="deleteDogButton" onClick={() => rejectRequest(request.id)}>Elutasít</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}