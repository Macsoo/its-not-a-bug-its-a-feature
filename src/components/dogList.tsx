import DogCard from "@/components/dogCard";


//Get dogs data here

export const dogs = [
    {
        dog_id: 1,
        dog_name: "Karcsi",
        dog_age: 1,
        dog_gender: "male",
        dog_description: "Karcsi egy kíváncsi és játékos kis kutya, aki imád labdázni. Energikus és gyorsan tanul."
    },
    {
        dog_id: 2,
        dog_name: "Juci",
        dog_age: 3,
        dog_gender: "female",
        dog_description: "Juci nyugodt természetű, de aktív sétákra is szívesen megy. Szereti a társaságot és jól kijön más kutyákkal."
    },
    {
        dog_id: 3,
        dog_name: "Béluci",
        dog_age: 0,
        dog_gender: "male",
        dog_description: "Béluci még kölyök, ezért sok játékra és figyelemre van szüksége. Kíváncsi, és tele van energiával."
    }
];

const DogList: React.FC = () => {
    return (
        <div className={`content`}>
            {dogs.map((dog) => (
                <div className={`w-full`} key={dog.dog_id}>
                <DogCard
                    dog_id={dog.dog_id}
                    dog_name={dog.dog_name}
                    dog_age={dog.dog_age}
                    dog_gender={dog.dog_gender}
                    dog_description={dog.dog_description}
                />
                </div>
            ))}
        </div>
    );
};

export default DogList;