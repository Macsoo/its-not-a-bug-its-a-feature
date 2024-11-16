'use client';
import {UpdateButton, DeleteButton, AdoptButton} from "@/components/dogsButton";
import {useContext, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {getDog} from "@/server/dogRepository";
import {listDogPictures} from "@/server/pictureRepository";
import {Dog, DogImage} from "@prisma/client";
import {useServerAction} from "@/utils";
import {DogPicture} from "@/components/dogPicture";

export default function DogUpdate({params}: { params: { dog_id: string } }) {
    const session = useContext(SessionContext);
    const dogId = parseInt(params.dog_id, 10);
    const [loading, setLoading] = useState(true);
    const [dog, setDog] = useState<Dog | null>(null);
    const [images, setImages] = useState<DogImage[]>([]);
    useServerAction(async () => {
        setDog(await getDog(dogId));
        setImages(await listDogPictures(dogId));
        setLoading(false);
    });

    return <>
        {dog &&
            (<div className={`content`}>
                <div className={`card`}>
                    <h2>{dog.name}</h2>
                    <div className={`flex flex-col`}>
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
                            </tbody>
                        </table>
                        <p>{dog.description}</p>
                        <b className={`py-2 text-center`}>{dog.name} képei:</b>
                        <div className={`imageContainer`}>
                            {images.map(image => {
                                return <DogPicture key={image.id} src={image.path} width={0} height={0}
                                                   sizes={`100vw`}
                                                   className={` w-auto h-full max-h-60 md:max-h-full md:w-full md:h-auto md:max-w-60`}/>
                            })}
                        </div>
                        {session.isSignedIn() && (
                            <div className={`flex flex-row gap-5 items-center justify-center`}>
                                <AdoptButton dog_id={dog.id}/>
                                <UpdateButton dog_id={dog.id}/>
                                <DeleteButton dog_id={dog.id}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>)
        }
        {!dog && !loading && <p>A keresett kutya nem található!</p>}
        {!dog && loading && <p>Kérjük várjon, a kutyus adatai épp töltődnek...</p>}
    </>;
}