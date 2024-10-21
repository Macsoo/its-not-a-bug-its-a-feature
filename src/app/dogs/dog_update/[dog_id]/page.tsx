'use client';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {Dog} from "@prisma/client";
import {useServerAction} from "@/utils";
import {getDog, updateDog} from "@/server/dogRepository";
import {useDropzone} from 'react-dropzone'

export default function UpdateDog({params}: { params: { dog_id: string } }) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const dogId = parseInt(params.dog_id, 10);
    const [dog, setDog] = useState<Dog | null>(null);
    const [name, setName] = useState(dog?.name);
    const [age, setAge] = useState(dog?.age);
    const [gender, setGender] = useState(dog?.gender);
    const [description, setDescription] = useState(dog?.description);
    useServerAction(async () => {
        setDog(await getDog(dogId));
        setName(dog?.name);
        setAge(dog?.age);
        setGender(dog?.gender);
        setDescription(dog?.description);
        setLoading(false);
    });

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

    const [files, setFiles] = useState<File[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                <img
                    src={file.webkitRelativePath}
                    onLoad={() => {
                        URL.revokeObjectURL(file.webkitRelativePath)
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.webkitRelativePath));
    }, [files]);

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
                                    defaultValue={name}
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
                                    defaultValue={age}
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
                                    <option value="male">Hím</option>
                                    <option value="female">Nőstény</option>
                                </select>
                            </div>
                            <div className={`flex flex-row items-center p-2`}>
                                <label htmlFor="description" className={`pr-1 w-[48px]`}>Leírás:</label>
                                <textarea
                                    className={`dogUpdateInput w-full h-[150px]`}
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    defaultValue={description}
                                />
                            </div>
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag `&#39;`n drop some files here, or click to select files</p>
                                </div>
                                <aside>
                                    {thumbs}
                                </aside>
                            </section>
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
