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
        const dogs = await listAllDogs(false);
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
            <div className={`w-full`}>
                <form id={"filter"}>
                    {
                        //TODO: show only available choices
                    }
                    <div>
                        <label>Kor:</label>
                        <select id={"age"}>
                            <option value={"null"}></option>
                            <option value={'TODO'}>TODO</option>
                        </select>

                    </div>
                    <div>
                        <label>Fajta:</label>
                        <select id={"breed"}>
                            <option value={"null"}></option>
                            <option value={'TODO'}>TODO</option>
                        </select>
                    </div>
                    <div>
                        <label>Nem:</label>
                        <select id={"gender"}>
                            <option value={"null"}></option>
                            <option value={'TODO'}>TODO</option>
                        </select>
                    </div>
                    <input id={`search`} type="submit" value="Keresés"/>
                </form>
            </div>
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