import DogCard from "@/components/dogCard";
import {useState} from "react";
import {Dog, DogImage} from "@prisma/client";
import {useServerAction} from "@/utils";
import {getAges, getBreeds, listAllDogs} from "@/server/dogRepository";
import {getPicture} from '@/server/pictureRepository'

type DogWithImage = { dog: Dog, image: DogImage };

export default function DogList() {
    const [dogsWithImages, setDogsWithImages] = useState<DogWithImage[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [ages, setAges] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [filters, setFilters] = useState({
        age: "null",
        breed: "null",
        gender: "null",
    });

    const fetchDogs = async (filterValues = filters) => {
        setLoading(true);
        const dogs = await listAllDogs(false);
        const filteredDogs = dogs.filter((dog) => {
            const matchesAge = filterValues.age === "null" || dog.age === parseInt(filterValues.age, 10);
            const matchesBreed = filterValues.breed === "null" || dog.breed === filterValues.breed;
            const matchesGender = filterValues.gender === "null" || dog.gender === filterValues.gender;
            return matchesAge && matchesBreed && matchesGender;
        });

        const dogsWithImage = [];
        for (const dog of filteredDogs) {
            dogsWithImage.push({
                dog: dog,
                image: (await getPicture(dog.primaryImgId))!,
            });
        }
        setDogsWithImages(dogsWithImage);
        setLoading(false);
    };

    useServerAction(async () => {
        const breedList = await getBreeds();
        setBreeds(breedList);
    })

    useServerAction(async () => {
        const ageList = await getAges();
        setAges(ageList);
    })

    useServerAction(fetchDogs);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [id]: value,
        }));
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchDogs();
    };

    const handleClearFilters = () => {
        const defaultFilters = {
            age: "null",
            breed: "null",
            gender: "null",
        };
        setFilters(defaultFilters);
        fetchDogs(defaultFilters);
    };

    return (
        <div className={`content`}>
            <div className={`w-full`}>
                <form id="filter" onSubmit={handleSearch}>
                    <div>
                        <label>Kor:</label>
                        <select id="age" value={filters.age} onChange={handleFilterChange}>
                            <option value="null">---</option>
                            {ages.map((age) => (
                                <option key={age} value={age}>
                                    {age}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Fajta:</label>
                        <select id="breed" value={filters.breed} onChange={handleFilterChange}>
                            <option value="null">---</option>
                            {breeds.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Nem:</label>
                        <select id="gender" value={filters.gender} onChange={handleFilterChange}>
                            <option value="null">---</option>
                            <option value="Male">Hím</option>
                            <option value="Female">Nőstény</option>
                        </select>
                    </div>
                    <input id="search" type="submit" value="Keresés"/>
                    <input type="button" value="Mégsem" onClick={handleClearFilters}/>
                </form>
            </div>
            {loading ? (
                <p>Kérem várjon, a kutyusok töltenek...</p>
            ) : dogsWithImages.length > 0 ? (
                dogsWithImages.map((dog) => (
                    <div className={`w-full`} key={dog.dog.id}>
                        <DogCard dog={dog.dog} dogImage={dog.image} />
                    </div>
                ))
            ) : (
                <p>Nem található a szűrésnek megfelelő kutyus!</p>
            )}
        </div>
    );
};