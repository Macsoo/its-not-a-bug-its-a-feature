'use client';
import "@/app/globals.css";
//import Image from "next/image";
import {currentRole, isSignedIn} from "@/components/roles";
import Link from "next/link";
import {UpdateButton, DeleteButton,AdoptButton} from "@/components/dogsButton"

export default function DogCard({dog_id, dog_name, dog_age, dog_gender, dog_description}: {
    dog_id: number,
    dog_name: string,
    dog_age: number,
    dog_gender: string,
    dog_description: string
}) {
    return (
        <div className={`card-dog`}>
            <p className={`w-[10%]`}>
                Role: {currentRole}
            </p>
            <div id="dog-text" className={`flex flex-col md:flex-row items-center justify-around min-w-[70%]`}
                 key={dog_id}>
                <div className={`min-w-[150px]`}>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan={2}>{dog_name}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><b>Kor:</b></td>
                            <td>{dog_age} éves</td>
                        </tr>
                        <tr>
                            <td><b>Nem:</b></td>
                            <td>{dog_gender === 'male' ? 'Hím' : 'Nőstény'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={`max-w-[60%] text-left`}>
                    {dog_description}
                </div>
                <Link href={`/dogs/${dog_id}`}>
                    <button>Tovább...</button>
                </Link>
            </div>
            <div className={`w-[10%]`}>
                {isSignedIn() && (
                    <div className={`flex flex-col gap-5 items-center`}>
                        <AdoptButton dog_id={dog_id}/>
                        <UpdateButton dog_id={dog_id}/>
                        <DeleteButton dog_id={dog_id}/>

                    </div>
                )}
            </div>
        </div>
    )
}