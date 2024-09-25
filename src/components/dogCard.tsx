'use client';
import "@/app/globals.css";
import {isSignedIn, isAdmin, isUser} from "@/components/roles";
//import Image from "next/image";

const role = "admin"; //role can be admin/user/guest

export default function DogCard() {
    return (
        <div className={`card-dog`}>
            <p className={`w-[10%]`}>
                Role: {role}
            </p>
            <div id="dog-text" className={`flex flex-col items-center justify-around min-w-[70%]`}>
                <p>
                    Adatok
                </p>
                <button id="descriptionButton">Tovább...</button>
            </div>
            {isSignedIn({role: role}) && (
                <div className={`w-[10%] flex flex-col gap-5 items-center`}>
                    {isUser({role: role}) && (
                        <button id="adoptButton">Adoptálás</button>
                    )}
                    {isAdmin({role: role}) && (
                        <div className="flex flex-col gap-5 items-center">
                            <button id="editDogButton">Szerkesztés</button>
                            <button id="deleteDogButton">Törlés</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}