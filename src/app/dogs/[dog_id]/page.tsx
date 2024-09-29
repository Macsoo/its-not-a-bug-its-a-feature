'use client';
 import {dogs} from "@/components/dogList";
import {UpdateButton, DeleteButton, AdoptButton} from "@/components/dogsButton";
import {useContext} from "react";
import {SessionContext} from "@/components/sessionContext";

export default function DogUpdate({params}: { params: { dog_id: string } }) {
    const session = useContext(SessionContext);
    const dogId = parseInt(params.dog_id, 10);
    const dog = dogs.find((d) => d.dog_id === dogId);

    if (!dog) {
        return <div>Kutya nem található!</div>;
    }

    return (
        <div className={`content`}>
            <div className={`card`}>
                <h2>{dog.dog_name}</h2>
                <div className={`flex flex-col`}>
                <table>
                    <tbody>
                    <tr>
                        <td className={`w-[60px]`}><b>Kor:</b></td>
                        <td>{dog.dog_age} éves</td>
                    </tr>
                    <tr>
                        <td><b>Nem:</b></td>
                        <td>{dog.dog_gender === 'male' ? 'Hím' : 'Nőstény'}</td>
                    </tr>
                    </tbody>
                </table>
                    <p>{dog.dog_description}</p>
                <div>
                    Képek ide
                </div>
                    {session.isSignedIn() && (
                        <div className={`flex flex-row gap-5 items-center justify-center`}>
                            <AdoptButton dog_id={dog.dog_id}/>
                            <UpdateButton dog_id={dog.dog_id}/>
                            <DeleteButton dog_id={dog.dog_id}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}