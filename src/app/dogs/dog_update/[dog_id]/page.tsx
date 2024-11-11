'use client';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import React, {useCallback, useEffect, useState} from 'react';
import {Dog, Gender} from "@prisma/client";
import {useServerAction} from "@/utils";
import {getDog, updateDog} from "@/server/dogRepository";
import {
    uploadPicture,
    listDogPictures,
    getImageUrl,
    deletePicture
} from "@/server/pictureRepository";
import {useDropzone} from "react-dropzone";
import {DogPicture} from "@/components/dogPicture";

enum SubmitAction {
    NOTHING,
    DELETE,
    UPLOAD,
}

type FileWithSubmitAction = {
    url: string;
    onSend: SubmitAction.NOTHING;
} | {
    file: File;
    onSend: SubmitAction.UPLOAD;
    dataUri: string;
} | {
    url: string;
    onSend: SubmitAction.DELETE;
};

export default function UpdateDog({params}: { params: { dog_id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const dogId = parseInt(params.dog_id, 10);
    const [dog, setDog] = useState<Dog | null>(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender>('Male');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<Array<FileWithSubmitAction>>([]);
    useServerAction(async () => {
        setDog(await getDog(dogId));
        for (const pic of await listDogPictures(dogId)) {
            const url = await getImageUrl(pic.path);
            const withAction: FileWithSubmitAction = {
                url,
                onSend: SubmitAction.NOTHING
            };
            setImageFiles(imageFiles.concat([withAction]));
        }
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

    const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
        const images = [];
        for (const file of acceptedFiles) {
            const fileWithInfo: FileWithSubmitAction = {
                file: file,
                onSend: SubmitAction.UPLOAD,
                dataUri: ''
            };
            await new Promise<void>(resolve => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    fileWithInfo.dataUri = fileReader.result as string;
                    resolve();
                };
                fileReader.readAsDataURL(file);
            });
            images.push(fileWithInfo);
        }
        setImageFiles(images);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop
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
        for (const imageFile of imageFiles) {
            switch (imageFile.onSend) {
                case SubmitAction.UPLOAD:
                    const formData = new FormData;
                    formData.set("dogId", dogId.toString());
                    formData.set("data", imageFile.file);
                    await uploadPicture(formData);
                    break;
                case SubmitAction.DELETE:
                    const urlEnd = imageFile.url.match(/\/[^\/]*$/)!;
                    await deletePicture(urlEnd[0]);
                    break;
                default:
                    break;
            }
        }
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
                            {imageFiles.map(file => {
                                switch (file.onSend) {
                                    case SubmitAction.UPLOAD:
                                        return <p className="mb-5" key={file.file.name}>
                                            <Image src={file.dataUri} alt="Upload preview" fill={true}
                                                   objectFit={'contain'}
                                                   objectPosition={'relative'}/>
                                        </p>
                                    case SubmitAction.NOTHING:
                                    case SubmitAction.DELETE:
                                        return <p className="mb-5" key={file.url}>
                                            <DogPicture src={file.url} fill={true} objectFit={'contain'}
                                                        objectPosition={'relative'}/>
                                        </p>
                                }
                            })}
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
