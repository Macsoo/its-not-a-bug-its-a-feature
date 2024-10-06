'use client';
import "../globals.css";

import React, {useContext, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import {addDog} from "@/server/dogRepository";
import {Gender} from "@prisma/client";

export default function AddDog() {
    const router = useRouter();
    const session = useContext(SessionContext);
    if (!session.isSignedIn())
        router.push('/login');
    const [name, setName] = useState("");
    const [chipId, setChipId] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender>('Male');
    const [description, setDescription] = useState("");
    const [breed, setBreed] = useState("");

    return (
        <div className="content">
            <div className={`card`}>
                <h2>Új kutya hozzáadása</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await addDog({
                        name,
                        chipId,
                        age,
                        gender,
                        description,
                        breed,
                        adopted: false,
                        imgPath: '/theDog.jpg'
                    });
                    router.push('/dogs');
                }}>
                    <div className={`form`}>
                        <label htmlFor="chipId" className={`pr-1 w-[48px]`}>Chip szám:</label>
                        <input
                            className={`dogUpdateInput`}
                            id="chipId"
                            type="text"
                            value={chipId}
                            pattern={"\\d{15}"}
                            onChange={(e) => setChipId(e.target.value)}
                        /> </div>
                        <div className={`form`}>
                            <label htmlFor="name" className={`pr-1 w-[48px]`}>Név:</label>
                            <input
                                className={`dogUpdateInput`}
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={`form`}>
                            <label htmlFor="age" className={`pr-1 w-[48px]`}>Kor:</label>
                            <input
                                className={`dogUpdateInput`}
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                            />
                        </div>
                        <div className={`form`}>
                            <label htmlFor="gender" className={`pr-1 w-[48px]`}>Nem:</label>
                            <select
                                className={`dogUpdateInput`}
                                id="gender"
                                value={gender}
                                onChange={(e) => {
                                    if (e.target.value === 'Male' || e.target.value === 'Female') {
                                        setGender(e.target.value)
                                    }
                                }}
                            >
                                <option value="Male">Hím</option>
                                <option value="Female">Nőstény</option>
                            </select>
                        </div>
                        <div className={`form`}>
                            <label htmlFor="breed" className={`pr-1 w-[48px]`}>Fajta:</label>
                            <input
                                className={`dogUpdateInput`}
                                id="breed"
                                type="text"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </div>
                            <div className={`flex flex-row items-center p-2`}>
                                <label htmlFor="description" className={`pr-1 w-[48px]`}>Leírás:</label>
                                <textarea
                                    className={`dogUpdateInput w-full h-[150px]`}
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className={`flex flex-row items-center justify-center`}>
                                <button id={`updateDog`} type="submit">Kutya Hozzáadása</button>
                            </div>
                </form>
            </div>
        </div>
    );
}