'use client';
import "../globals.css";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import {addDog, addPictures, updateDog} from "@/server/dogRepository";
import {Gender} from "@prisma/client";
import {useDropzone} from "react-dropzone";
import Image from "next/image";
import {deleteTempPictures, getPictureByPath, uploadPicture} from "@/server/pictureRepository";

function Error({error}: { error?: string }) {
    if (error) {
        return <span className={`error pl-8 max-lg:pl-0`}>Hiba: {error}</span>
    } else {
        return null;
    }
}

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
    const [ChipError, setChipError] = useState("");
    const [pictureError, setPictureError] = useState("");

    const handleChipValidation = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (!input.validity.valid) {
            if (input.validity.patternMismatch) {
                setChipError('Kérjük, pontosan 15 számjegyet adjon meg a chipszámhoz.');
            } else {
                setChipError('Helytelen bemenet.');
            }
        } else {
            setChipError('');
        }
    };

    const [files, setFiles] = useState<(File & { preview: string, primary: boolean })[]>();

    const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
        for (const file of acceptedFiles) {
            new FileReader().readAsDataURL(file);
        }
        setFiles(acceptedFiles.map(file => Object.assign(
            file, {
                preview: URL.createObjectURL(file),
                primary: false,
            })));
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop
    });

    const removeFile = (file: File & { preview: string, primary: boolean }): React.MouseEventHandler => (e) => {
        e.preventDefault();
        if (files !== undefined) {
            const newFiles = [...files]
            newFiles.splice(newFiles.indexOf(file), 1)
            setFiles(newFiles)
        }
    }

    const removeAll: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setFiles([])
    }

    const mouseEnterHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display: flex; display: flex; justify-content: center; align-items: center; background-color: rgb(1, 0.984, 0.922, 0.5); width: 100%; height: 100%")
        console.log(e.currentTarget)
    });

    const mouseLeaveHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display:none")
        console.log(e.currentTarget)
    });

    const setPrimary = (file: Blob & { preview: string, primary: boolean }): React.MouseEventHandler => (e) => {
        e.preventDefault();
        setFiles(files?.map(f => {
            if (f === file) {
                return Object.assign(f, {primary: true});
            } else {
                return Object.assign(f, {primary: false});
            }
        }));
    };

    const thumbs = files !== undefined ? files.map(file => (
        <div key={file.preview} className={`uploadImagesCon relative ${file.primary ? " primaryImage" : ""}`}>
            <div className={`grid w-full h-full`} onMouseEnter={mouseEnterHandler}
                 onMouseLeave={mouseLeaveHandler}>
                <Image src={URL.createObjectURL(file)} alt={file.preview} className={`imageUpload`} fill/>
                <div className={`hiddenXButton`}>
                    <input type={"button"} onClick={removeFile(file)} className={"x-button"} value={"X"}/>
                    <input type={"button"} className={"primaryButton"} value={String.fromCodePoint(128054)}
                           onClick={setPrimary(file)}/>
                </div>
            </div>
        </div>
    )) : null;

    useEffect(() => {
        if (files !== undefined)
            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="content">
            <div className={`card`}>
                <h2 className={`max-lg:text-center`}>Új kutya hozzáadása</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (files == undefined || files.length == 0) {
                        setPictureError("Kép feltöltése kötelező!");
                        return
                    }
                    if (files.length > 1 && !files.some(f => f.primary)) {
                        setPictureError("Fő kép kiválasztása kötelező!");
                        return
                    }
                    if (files.length == 1) {
                        files[0].primary = true;
                    }
                    const paths = [];
                    let primaryPath = "";
                    for (const image of files) {
                        const formData = new FormData;
                        formData.set("data", image);
                        const path = await uploadPicture(formData);
                        if (image.primary) {
                            primaryPath = path;
                        }
                        paths.push(path);
                    }
                    const dogId = await addDog({
                        name,
                        chipId,
                        age,
                        gender,
                        description,
                        breed,
                        adopted: false
                    });
                    await addPictures(dogId, paths);
                    const primaryImage = await getPictureByPath(dogId, primaryPath);
                    await updateDog({
                        id: dogId,
                        primaryImgId: primaryImage!.id,
                    });
                    await deleteTempPictures();
                    router.push('/dogs');
                }}>
                    <div className={`dogForm`}>
                        <label htmlFor="chipId" className={`pr-1 w-[48px]`}><b>Chip szám:</b></label>
                        <div className={'block max-lg:flex flex-col'}>
                            <input
                                className={`dogUpdateInput`}
                                id="chipId"
                                type="text"
                                value={chipId}
                                pattern={"\\d{15}"}
                                onChange={(e) => setChipId(e.target.value)}
                                autoFocus={true}
                                onInvalid={handleChipValidation}
                                onInput={handleChipValidation}
                                required
                            />
                            <Error error={ChipError}/>
                        </div>
                    </div>


                    <div className={`dogForm`}>
                        <label htmlFor="name" className={`pr-1 w-[48px]`}><b>Név:</b></label>
                        <input
                            className={`dogUpdateInput`}
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            required
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
                        <label htmlFor="breed" className={`pr-1 w-[48px]`}><b>Fajta:</b></label>
                        <input
                            className={`dogUpdateInput`}
                            id="breed"
                            type="text"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                        />
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
                        {(files == undefined || files.length == 0) ? (<div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()}/>

                                <div className={`flex flex-col justify-center items-center m-auto`}>
                                    <p className={`font-bold max-lg:text-center`}> Képek feltöltése:</p>
                                    {isDragActive ?
                                        <p className={`italic text-sm text-center`}>Húzza ide a fájlokat ...</p> :
                                        <p className={`italic text-sm text-center`}>Húzza be a fájlokat,<br/> vagy
                                            kattintson ide a fájlfeltöltéshez.</p>}
                                    <Image src="/upload-icon.png" width={30} height={30} alt="upload"/>
                                </div>
                            </div>
                        ) : (<input type={"button"} onClick={removeAll} value={"Összes törlése"}/>)}

                        <div className={`uploadImageContainer`}>
                            {thumbs}
                        </div>
                    </div>

                    <Error error={pictureError}/>

                    <div className={`mt-10 flex flex-row items-center justify-center`}>
                        <input id={`updateDog`} type="submit" value={"Hozzáadás"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}