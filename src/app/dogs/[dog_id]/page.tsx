'use client';
import {UpdateButton, DeleteButton, AdoptButton} from "@/components/dogsButton";
import {useContext, useEffect, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {getDog} from "@/server/dogRepository";
import {listDogPictures} from "@/server/pictureRepository";
import {Dog, DogImage} from "@prisma/client";
import {useServerAction} from "@/utils";
import {DogPicture} from "@/components/dogPicture"

export default function DogUpdate({params}: { params: { dog_id: string } }) {
    const session = useContext(SessionContext);
    const dogId = parseInt(params.dog_id, 10);
    const [dog, setDog] = useState<Dog | null>(null);
    const [images, setImages] = useState<DogImage[]>([]);
    const [loadingMessage, setLoadingMessage] = useState("Kérjük várjon, a kutyus adatai épp töltődnek...");
    const [loaded, setLoaded] = useState(0);
    const [showPictures, setShowPictures] = useState(false);
    useServerAction(async () => {
        setDog(await getDog(dogId));
        setImages(await listDogPictures(dogId));
        setLoaded(0);
        setShowPictures(false);
        if (dog == null) {
            setLoadingMessage("A keresett kutya nem található!");
        }
    });
    useEffect(() => {
        if (images.length == loaded) {
            setShowPictures(true);
        }
    }, [images, loaded]);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        {dog &&
            (<div className={`content`}>
                <div className={`card`}>
                    <h2 className={`w-full max-lg:text-center`} >{dog.name}</h2>
                    <div className={`flex flex-col`}>
                        {isSmallScreen ? (
                            <div className={'flex flex-col items-center'}>
                                <p><b>Kor:</b> {dog.age} éves </p>
                                <p><b>Nem:</b> {dog.gender === 'Male' ? 'Hím' : 'Nőstény'} </p>
                                <p><b>Fajta:</b> {dog.breed}</p>
                            </div>
                        ) : (
                            <table>
                                <tbody>
                                <tr>
                                    <td className={`w-16`}><b>Kor:</b></td>
                                    <td>{dog.age} éves</td>
                                </tr>
                                <tr>
                                    <td className={`w-16`}><b>Nem:</b></td>
                                    <td>{dog.gender === 'Male' ? 'Hím' : 'Nőstény'}</td>
                                </tr>
                                <tr>
                                    <td><b>Fajta:</b></td>
                                    <td>{dog.breed}</td>
                                </tr>
                                </tbody>
                            </table>
                        )}
                        <p>{dog.description}</p>
                        <b className={`py-2 text-center`}>{dog.name} képei:</b>
                        <div className={`${showPictures && 'imageContainer'}`}>
                            {!showPictures && <div className={'w-full text-center'}>
                                Kérem várjon, a képek töltenek...
                            </div>}
                            {images.map(image => {
                                return (<DogPicture key={image.id} src={image.path} width={80} height={80}
                                                    sizes={`100vw`}
                                                    className={`${showPictures && 'border-[#fcedd1] border-[10px] max-h-60 md:max-h-full rounded-md w-auto h-full md:w-full md:h-auto md:max-w-60'} ${!showPictures && 'size-0'}`}
                                                   onLoad={() => setLoaded(x => x + 1)}/>)
                            })}
                        </div>
                        {session.isSignedIn() && (
                            <div className={`flex max-lg:flex-col flex-row gap-5 items-center justify-center`}>
                                <AdoptButton dog_id={dog.id}/>
                                <UpdateButton dog_id={dog.id}/>
                                <DeleteButton dog_id={dog.id}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>)
        }
        {!dog && <div className={"content"}>{loadingMessage}</div>}
    </>;
}