import DogCard from "@/components/dogCard";
import {useState} from "react";
import {Dog, DogImage} from "@prisma/client";
import {useServerAction} from "@/utils";
import {listAllDogs} from "@/server/dogRepository";
import {getPicture} from '@/server/pictureRepository'

type DogWithImage = { dog: Dog, image: DogImage };

export default function DogList() {
    const [dogsWithImages, setDogsWithImages] = useState<DogWithImage[]>([]);
    useServerAction(async () => {
        const dogs = await listAllDogs();
        const dogsWithImage = [];
        for (const dog of dogs) {
            dogsWithImage.push({
                dog: dog,
                image: (await getPicture(dog.primaryImgId))!,
            });
        }
        setDogsWithImages(dogsWithImage);
    });
    return (
        <div className={`content`}>
            {dogsWithImages.length > 0 && dogsWithImages.map((dog) => (
                <div className={`w-full`} key={dog.dog.id}>
                    <DogCard
                        dog={dog.dog}
                        dogImage={dog.image}
                    />
                </div>
            ))}
            {dogsWithImages.length === 0 && <p>Kutyák betöltése folyamatban...</p>}
        </div>
    );
};