'use client';
import {useRouter} from 'next/navigation';
import React, {useCallback, useEffect, useState} from 'react';
import {Dog, DogImage, Gender} from "@prisma/client";
import {useServerAction} from "@/utils";
import {getDog, updateDog} from "@/server/dogRepository";
import {getDogProfilePicture} from "@/server/pictureRepository";
import {useDropzone} from "react-dropzone";

export default function UpdateDog({params}: { params: { dog_id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const dogId = parseInt(params.dog_id, 10);
    const [dog, setDog] = useState<Dog | null>(null);
    const [dogImage, setDogImage] = useState<DogImage | null>(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender>('Male');
    const [description, setDescription] = useState('');
    useServerAction(async () => {
        setDog(await getDog(dogId));
        setDogImage(await getDogProfilePicture(dogId));
    });

    useEffect(() => {
        if (dog === null) {
            setLoading(false);
            return;
        }
        setName(dog.name);
        setAge(dog.age);
        setGender(dog.gender);
        setDescription(dog.description);
        setLoading(false);
    }, [dog]);

    useEffect(() => {
        if (dogImage === null) return;
        setPreview(dogImage.path)
    }, [dogImage]);

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader;

        file.onload = function() {
            setPreview(file.result);
        }

        file.readAsDataURL(acceptedFiles[0])
    }, [])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateDog({
            id: dogId,
            name: name,
            age: age,
            gender: gender,
            description: description,
        });
        router.push(`/dogs/${dogId}`);
    };

    return <>
        {dog &&
            (
                <div className={`content`}>
                    <div className={`card`}>
                        <h2>{dog.name} adatainak szerkesztése</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={`form`}>
                                <label htmlFor="name" className={`pr-1 w-[48px]`}>Név:</label>
                                <input
                                    className={`dogUpdateInput`}
                                    id="name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
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
                            <div className={`flex flex-row items-center p-2`}>
                                <label htmlFor="description" className={`pr-1 w-[48px]`}>Leírás:</label>
                                <textarea
                                    className={`dogUpdateInput w-full h-[150px]`}
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
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
                                    <img src={preview as string} alt="Upload preview" />
                                </p>
                            )}
                            <div className={`flex flex-row items-center justify-center`}>

                                <button id={`updateDog`} type="submit">Frissítés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        {!dog && !loading && <p>A keresett kutya nem található!</p>}
        {!dog && loading && <p>Kérjük várjon, a kutyus adatai épp töltődnek...</p>}
    </>
};
