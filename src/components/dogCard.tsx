'use client';
import "@/app/globals.css";
import {DogsButtons} from "@/components/buttons";
//import Image from "next/image";
import {currentRole} from "@/components/roles";

export default function DogCard({dog_id, dog_name, dog_age, dog_gender, dog_description, key}: {
    dog_id: number,
    dog_name: string,
    dog_age: number,
    dog_gender: string,
    dog_description: string,
    key?: number
}) {
    return (
        <div className={`card-dog`}>
            <p className={`w-[10%]`}>
                Role: {currentRole}
            </p>
            <div id="dog-text" className={`flex flex-col md:flex-row items-center justify-around min-w-[70%]`}
                 key={dog_id}>
                <p className={`min-w-[150px]`}>
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
                </p>
                <p className={`max-w-[60%] text-left`}>
                    {dog_description}
                </p>
                <button id="descriptionButton">Tovább... {key}</button>
            </div>
            <div className={`w-[10%]`}>
                <DogsButtons/>
            </div>
        </div>
    )
}