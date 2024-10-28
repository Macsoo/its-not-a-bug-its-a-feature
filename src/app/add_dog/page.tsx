'use client';
import "../globals.css";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import {addDog} from "@/server/dogRepository";
import {DogImage, Gender} from "@prisma/client";
import {useDropzone} from "react-dropzone";

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
    const [errorMessage, setErrorMessage] = useState('');
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [dogImage, setDogImage] = useState<DogImage | null>(null);

    const handleValidation = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (!input.validity.valid) {
            if (input.validity.patternMismatch) {
                setErrorMessage('Please enter exactly 15 digits for the chip number.');
            } else {
                setErrorMessage('Invalid input.');
            }
        } else {
            setErrorMessage('');
        }
    };

    useEffect(() => {
        if (dogImage === null) return;
        setPreview(dogImage.path)
    }, [dogImage]);

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader;

        file.onload = function () {
            setPreview(file.result);
        }

        file.readAsDataURL(acceptedFiles[0])
    }, [])

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop
    });

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
                            autoFocus={true}
                            onInvalid={handleValidation}
                            onInput={handleValidation}
                            required
                        />
                    </div>

                    {errorMessage && <span style={{color: 'red'}}>{errorMessage}</span>}

                    <div className={`form`}>
                        <label htmlFor="name" className={`pr-1 w-[48px]`}>Név:</label>
                        <input
                            className={`dogUpdateInput`}
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            required
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
                    <div>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                            }
                        </div>
                        {preview && (
                            <p className="mb-5">
                                <img src={preview as string} alt="Upload preview"/>
                            </p>
                        )}
                    </div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <button id={`updateDog`} type="submit">Kutya Hozzáadása</button>
                    </div>
                </form>
            </div>
        </div>
    );
}