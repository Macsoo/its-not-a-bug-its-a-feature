'use client';
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import {UpdateButton, DeleteButton,AdoptButton} from "@/components/dogsButton"
import {useContext} from "react";
import {SessionContext} from "@/components/sessionContext";
import {Dog, DogImage} from "@prisma/client";

export default function DogCard({dog, dogImage}:{dog:Dog, dogImage: DogImage}) {
    const session = useContext(SessionContext);
    return (
        <div className={`card-dog`}>
            <p className={`w-[10%]`}>
                <Image src={dogImage.path} alt={dog.name} width={700} height={525}/>
            </p>
            <div id="dog-text" className={`flex flex-col md:flex-row items-center justify-around min-w-[70%]`}
                 key={dog.id}>
                <div className={`min-w-[150px]`}>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan={2}>{dog.name}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><b>Kor:</b></td>
                            <td>{dog.age} éves</td>
                        </tr>
                        <tr>
                            <td><b>Nem:</b></td>
                            <td>{dog.gender === 'Male' ? 'Hím' : 'Nőstény'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={`max-w-[60%] text-left`}>
                    {dog.description}
                </div>
                <Link href={`/dogs/${dog.id}`}>
                    <button>Tovább...</button>
                </Link>
            </div>
            <div className={`w-[10%]`}>
                {session.isSignedIn() && (
                    <div className={`flex flex-col gap-5 items-center`}>
                        <AdoptButton dog_id={dog.id}/>
                        <UpdateButton dog_id={dog.id}/>
                        <DeleteButton dog_id={dog.id}/>

                    </div>
                )}
            </div>
        </div>
    )
}