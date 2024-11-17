'use client';
import "../globals.css";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import {addDog} from "@/server/dogRepository";
import {Gender} from "@prisma/client";
import {useDropzone} from "react-dropzone";
import Image from "next/image";

function Error({error}: {error?: string}) {
    if (error) {
        return <div className={`error text-center pt-5`}>{error}</div>
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
        }
    };

    const [files, setFiles] = useState<(Blob & { preview: string })[]>();

    const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
        setFiles(acceptedFiles.map(file => Object.assign(
            file.slice(), {
                preview: URL.createObjectURL(file)
            })));
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop
    });

    const removeFile = (file: Blob & { preview: string }): React.MouseEventHandler => (e) => {
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
        e.currentTarget!.lastElementChild!.setAttribute("style", "display: flex; display: flex; justify-content: center; align-items: center; background-color: rgb(1, 0.984, 0.922, 0.5)")
        console.log(e.currentTarget)
    });

    const mouseLeaveHandler: React.MouseEventHandler = ((e) => {
        e.currentTarget!.lastElementChild!.setAttribute("style", "display:none")
        console.log(e.currentTarget)
    });

    const thumbs = files !== undefined ? files.map(file => (
        <div key={file.preview} className={`inline-flex w-[30%]`}>
            <div className={`grid h-max`} onMouseEnter={mouseEnterHandler}
                 onMouseLeave={mouseLeaveHandler}>
                <Image src={URL.createObjectURL(file)} alt={file.preview} className={`imageUpload`} width={80} height={80}/>
                <div className={`hiddenXButton`}>
                    <input type={"button"} onClick={removeFile(file)} id={"x-button"} value={"X"}/>
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
                <h2>Új kutya hozzáadása</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if(files == undefined || files.length==0){
                        setPictureError("Kép feltöltése kötelező!");
                        return
                    }

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
                            onInvalid={handleChipValidation}
                            onInput={handleChipValidation}
                            required
                        />
                    </div>

                    <Error error={ChipError}/>

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
                            min={0}
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



                    <div className={`dragAndDropContainer`}>
                        {(files == undefined || files.length == 0) ? (<div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()}/>

                                <div className={`flex flex-col justify-center items-center m-auto`}>
                                    <p className={`font-bold`}> Képek feltöltése:</p>
                                    {isDragActive ?
                                        <p className={`italic text-sm text-center`}>Húzza ide a fájlokat ...</p> :
                                        <p className={`italic text-sm text-center`}>Húzza be a fájlokat,<br/> vagy
                                            kattintson ide a fájlfeltöltéshez.</p>}
                                    <Image src="/upload-icon.png" width={30} height={30} alt="upload"/>
                                </div>
                            </div>
                            ): (<input type={"button"} onClick={removeAll} value={"Összes törlése"}/>)}

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