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
    deletePicture,
    getPictureByPath,
} from "@/server/pictureRepository";
import {useDropzone} from "react-dropzone";
import {DogPicture} from "@/components/dogPicture";
import {ConfirmDialog} from "@/components/dogsButton";
import {SessionContext} from "@/components/sessionContext";


function Error({error}: { error?: string }) {
    if (error) {
        return <span className={`error pl-8 max-lg:pl-0`}>Hiba: {error}</span>
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
        const doggo = await getDog(dogId);
        setDog(doggo);
        if (doggo === null) {
            setLoadingMessage("A keresett kutya nem található!");
            return;
        }
        const pics = await listDogPictures(dogId);
        setImageFiles((old) => {
            old = [];
            for (const pic of pics) {
                const url = pic.path;
                const withAction: FileWithSubmitAction = {
                    url,
                    onSend: SubmitAction.NOTHING,
                    isPrimary: doggo.primaryImgId === pic.id,
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

    const setPrimary = (file: FileWithSubmitAction): React.MouseEventHandler => (e) => {
        e.preventDefault();
        setImageFiles(imageFiles.map(f => {
            if (f === file) {
                return Object.assign(f, { isPrimary: true });
            } else if (f.isPrimary) {
                return Object.assign(f, { isPrimary: false });
            } else {
                return f;
            }
        }));
    };

    const mouseEnterHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display: flex; display: flex; justify-content: center; align-items: center; background-color: rgb(1, 0.984, 0.922, 0.5); width:100%; height: 100%;")
        console.log(e.currentTarget)
    });

    const mouseLeaveHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display:none")
        console.log(e.currentTarget)
    });


    const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
        const images = [];
        for (const prev of imageFiles) {
            images.push(prev);
        }
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
    }, [imageFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imageFiles.filter(f => f.onSend != SubmitAction.DELETE).length == 0) {
            setPictureError("Kép feltöltése kötelező!");
            return;
        }
        const keptImages = imageFiles.filter(f => f.onSend != SubmitAction.DELETE);
        if (keptImages.length > 1 && !keptImages.some(f => f.isPrimary)) {
            setPictureError("Selecting a primary image is necessary");
            return;
        }
        if (keptImages.length == 1) {
            imageFiles[imageFiles.indexOf(keptImages[0])].isPrimary = true;
        }
        let primary: string | null = null;
        for (const imageFile of imageFiles.filter(f => f.onSend == SubmitAction.UPLOAD)) {
            const formData = new FormData;
            formData.set("dogId", dogId.toString());
            formData.set("data", imageFile.file);
            const path = await uploadPicture(formData);
            if (imageFile.isPrimary) {
                primary = path;
            }
        }
        for (const imageFile of imageFiles.filter(f => f.onSend == SubmitAction.NOTHING)) {
            if (imageFile.isPrimary) {
                primary = imageFile.url;
            }
        }
        const primaryImage = await getPictureByPath(dogId, primary!);
        await updateDog({
            id: dogId,
            primaryImgId: primaryImage!.id,
            name: name,
            age: age,
            gender: gender,
            description: description,
        });
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
                        <h2 className={`max-lg:text-center`}>{dog.name} adatainak szerkesztése</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={`dogForm`}>
                                <label htmlFor="name" className={`pr-1 w-[48px]`}><b>Név:</b></label>
                                <input
                                    className={`dogUpdateInput`}
                                    id="name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className={`dogForm`}>
                                <label htmlFor="age" className={`pr-1 w-[48px]`}><b>Kor:</b></label>
                                <input
                                    className={`dogUpdateInput`}
                                    id="age"
                                    type="number"
                                    min={0}
                                    value={age}
                                    onChange={(e) => setAge(parseInt(e.target.value))}
                                />
                            </div>
                            <div className={`dogForm`}>
                                <label htmlFor="gender" className={`pr-1 w-[48px]`}><b>Nem:</b></label>
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
                            <div className={`dogForm`}>
                                <label htmlFor="description" className={`pr-1 w-[48px]`}><b>Leírás:</b></label>
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
                                        <p className={`font-bold max-lg:text-center`}><b> Képek feltöltése:</b></p>
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
                                                return <div key={file.dataUri}
                                                            className={`uploadImagesCon relative ${file.isPrimary ? " primaryImage" : ""}`}>
                                                    <div className={`grid w-full h-full`}
                                                         onMouseEnter={mouseEnterHandler}
                                                         onMouseLeave={mouseLeaveHandler}>
                                                        <Image src={file.dataUri} alt="Upload preview"
                                                               className={`imageUpload`} fill/>
                                                        <div className={`hiddenXButton`}>
                                                            <input type={"button"} onClick={removeFile(file)}
                                                                   className={"x-button"} value={"X"}/>
                                                            <input type={"button"} className={"primaryButton"}
                                                                   value={String.fromCodePoint(128054)}
                                                                   onClick={setPrimary(file)}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            case SubmitAction.NOTHING:
                                                return <div key={file.url}
                                                            className={`uploadImagesCon relative ${file.isPrimary ? " primaryImage" : ""}`}>
                                                    <div className={`grid w-full h-full`}
                                                         onMouseEnter={mouseEnterHandler}
                                                         onMouseLeave={mouseLeaveHandler}>
                                                        <DogPicture src={file.url} className={`imageUpload`} fill/>
                                                        <div className={`hiddenXButton`}>
                                                            <input type={"button"} onClick={removeFile(file)}
                                                                   className={"x-button"} value={"X"}/>
                                                            <input type={"button"} className={"primaryButton"}
                                                                   value={String.fromCodePoint(128054)}
                                                                   onClick={setPrimary(file)}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            default:
                                                return <></>
                                        }
                                    })}
                                </div>
                            </div>

                            <div className={"w-full flex items-center justify-center"}><Error error={pictureError}/>
                            </div>

                            <div className={`flex flex-row items-center justify-center max-lg:flex-col`}>
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
