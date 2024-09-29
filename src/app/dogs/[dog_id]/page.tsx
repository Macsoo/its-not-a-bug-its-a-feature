'use client';
import {UpdateButton, DeleteButton, AdoptButton} from "@/components/dogsButton";
import {useContext, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {getDog} from "@/server/dogRepository";
import {Dog} from "@prisma/client";
import {useServerAction} from "@/utils";

export default function DogUpdate({params}: { params: { dog_id: string } }) {
    const session = useContext(SessionContext);
    const dogId = parseInt(params.dog_id, 10);
    const [dog, setDog] = useState<Dog | null>(null);
    useServerAction(async () => {
        setDog(await getDog(dogId));
    });

    if (!dog) {
        return <div>Kutya nem található!</div>;
    }

    return (
        <div className={`content`}>
            <div className={`card`}>
                <h2>{dog.name}</h2>
                <div className={`flex flex-col`}>
                <table>
                    <tbody>
                    <tr>
                        <td className={`w-[60px]`}><b>Kor:</b></td>
                        <td>{dog.age} éves</td>
                    </tr>
                    <tr>
                        <td><b>Nem:</b></td>
                        <td>{dog.gender === 'Male' ? 'Hím' : 'Nőstény'}</td>
                    </tr>
                    </tbody>
                </table>
                    <p>{dog.description}</p>
                <div>
                    Képek ide
                </div>
                    {session.isSignedIn() && (
                        <div className={`flex flex-row gap-5 items-center justify-center`}>
                            <AdoptButton dog_id={dog.id}/>
                            <UpdateButton dog_id={dog.id}/>
                            <DeleteButton dog_id={dog.id}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}