'use client';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Dog, Gender} from "@prisma/client";
import {useServerAction} from "@/utils";
import {getDog, updateDog} from "@/server/dogRepository";
import {
    uploadPicture,
    listDogPictures,
    deletePicture, getDogProfilePicture
} from "@/server/pictureRepository";
import {useDropzone} from "react-dropzone";
import {DogPicture} from "@/components/dogPicture";
import {ConfirmDialog} from "@/components/dogsButton";
import {SessionContext} from "@/components/sessionContext";


function Error({error}: { error?: string }) {
    if (error) {
        return <div className={`error text-center pt-5`}>{error}</div>
    } else {
        return null;
    }
}

enum SubmitAction {
    NOTHING,
    DELETE,
    UPLOAD,
}

type FileWithSubmitAction = {
    url: string;
    onSend: SubmitAction.NOTHING;
    isPrimary: boolean;
} | {
    file: File;
    onSend: SubmitAction.UPLOAD;
    dataUri: string;
    isPrimary: boolean;
} | {
    url: string;
    onSend: SubmitAction.DELETE;
    isPrimary: boolean;
};

export default function UpdateDog({params}: { params: { dog_id: string } }) {
    const router = useRouter();
    const session = useContext(SessionContext);
    const dogId = parseInt(params.dog_id, 10);
    if (!session.isSignedIn())
        router.push('/login');
    if (!session.isAdmin())
        router.push(`/dogs/${dogId}`);
    const [dog, setDog] = useState<Dog | null>(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender>('Male');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<Array<FileWithSubmitAction>>([]);

    const [loadingMessage, setLoadingMessage] = useState("Kérjük várjon, a kutyus adatai épp töltődnek...");

    const [pictureError, setPictureError] = useState("");

    useServerAction(async () => {
        setDog(await getDog(dogId));
        const pics = await listDogPictures(dogId);
        setImageFiles((old) => {
            old = [];
            for (const pic of pics) {
                const url = pic.path;
                const withAction: FileWithSubmitAction = {
                    url,
                    onSend: SubmitAction.NOTHING,
                    isPrimary: dog!.primaryImgId === pic.id,
                };
                old.push(withAction);
            }
            return old;
        });
        if (dog == null) {
            setLoadingMessage("A keresett kutya nem található!");
        }
    });

    useEffect(() => {
        if (dog !== null) {
            setName(dog.name);
            setAge(dog.age);
            setGender(dog.gender);
            setDescription(dog.description);
        }
    }, [dog]);


    const removeFile = (file: FileWithSubmitAction): React.MouseEventHandler => (e) => {
        e.preventDefault();
        if (file.onSend == SubmitAction.UPLOAD) {
            setImageFiles(imageFiles.filter(f => f != file));
        } else {
            setImageFiles(imageFiles.map(f => {
                if (f.onSend == SubmitAction.NOTHING && f.url == file.url) {
                    return {onSend: SubmitAction.DELETE, url: file.url, isPrimary: f.isPrimary};
                } else {
                    return f;
                }
            }));
        }
    }

    const mouseEnterHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display: flex; display: flex; justify-content: center; align-items: center; background-color: rgb(1, 0.984, 0.922, 0.5)")
        console.log(e.currentTarget)
    });

    const mouseLeaveHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display:none")
        console.log(e.currentTarget)
    });


    const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
        const images = [];
        for (const file of acceptedFiles) {
            const fileWithInfo: FileWithSubmitAction = {
                file: file,
                onSend: SubmitAction.UPLOAD,
                dataUri: '',
                isPrimary: false,
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
        if (imageFiles.filter(f => f.onSend != SubmitAction.DELETE).length == 0) {
            setPictureError("Kép feltöltése kötelező!");
            return;
        }
        if (imageFiles.length == 1) {
            imageFiles[0].isPrimary = true;
        }
        if (imageFiles.some(f => !f.isPrimary)) {
            setPictureError("Selecting a primary image is necesarry");
        }
        for (const imageFile of imageFiles.filter(f => f.onSend == SubmitAction.UPLOAD)) {
            const formData = new FormData;
            formData.set("dogId", dogId.toString());
            formData.set("data", imageFile.file);
            await uploadPicture(formData);
            if (imageFile.isPrimary) {
                const primaryImage = await getDogProfilePicture(dogId);
                await updateDog({
                    id: dog!.id,
                    chipID: dog!.chipId,
                    name: dog!.name,
                    age: dog!.age,
                    gender: dog!.gender,
                    breed: dog!.breed,
                    description: dog!.description,
                    adopted: dog!.adopted,
                    primaryImgId: primaryImage!.id,
                })
            }
        }
        for (const imageFile of imageFiles.filter(f => f.onSend == SubmitAction.DELETE)) {
            await deletePicture(imageFile.url);
        }
        router.push(`/dogs/${dogId}`);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                                    min={0}
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
                            <div className={`dragAndDropContainer`}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className={`flex flex-col justify-center items-center m-auto`}>
                                        <p className={`font-bold`}> Képek feltöltése:</p>
                                        {isDragActive ?
                                            <p className={`italic text-sm text-center`}>Húzza ide a fájlokat ...</p> :
                                            <p className={`italic text-sm text-center`}>Húzza be a fájlokat,<br/> vagy
                                                kattintson ide a fájlfeltöltéshez.</p>}
                                    </div>
                                </div>
                                <div className={`uploadImageContainer`}>
                                    {imageFiles.map(file => {
                                        switch (file.onSend) {
                                            case SubmitAction.UPLOAD:
                                                return <div key={file.dataUri} className={`inline-flex relative w-[300px] h-[300px]`}>
                                                    <div className={`grid`} onMouseEnter={mouseEnterHandler}
                                                         onMouseLeave={mouseLeaveHandler}>
                                                        <Image src={file.dataUri} alt="Upload preview"
                                                               className={`imageUpload`} fill/>
                                                        <div className={`hiddenXButton`}>
                                                            <input type={"button"} onClick={removeFile(file)}
                                                                   id={"x-button"} value={"X"}/>
                                                            <input type={"button"} id={"primaryButton"}
                                                                   value={String.fromCharCode(9733)}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            case SubmitAction.NOTHING:
                                                return <div key={file.url} className={`inline-flex relative w-[300px] h-[300px]`}>
                                                    <div className={`grid`} onMouseEnter={mouseEnterHandler}
                                                         onMouseLeave={mouseLeaveHandler}>
                                                        <DogPicture src={file.url} className={`imageUpload`} fill/>
                                                        <div className={`hiddenXButton`}>
                                                            <input type={"button"} onClick={removeFile(file)}
                                                                   id={"x-button"} value={"X"}/>
                                                            <input type={"button"} id={"primaryButton"}
                                                                   value={String.fromCharCode(9733)}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            default:
                                                return <></>
                                        }
                                    })}
                                </div>
                            </div>

                            <Error error={pictureError}/>

                            <div className={`flex flex-row items-center justify-center`}>
                                <input id={`updateDog`} type="submit" value={"Frissítés"}/>
                                {!isDialogOpen && (
                                    <input type={"button"} onClick={() => setIsDialogOpen(true)} value={"Mégsem"}/>)}
                                {isDialogOpen && (
                                    <ConfirmDialog
                                        message="Biztosan elveted a módosításokat?"
                                        onConfirm={() => {
                                            router.push(`/dogs/${dog.id}`);
                                        }}
                                        onCancel={() => setIsDialogOpen(false)}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        {!dog && <div className={"content"}>{loadingMessage}</div>}
    </>
};
