'use client';
import "../globals.css";
import {useEffect, useState} from "react";
import {registerUser} from "@/server/userRepository";

function Error({error}: {error?: string}) {
    if (error) {
        return <div className={`text-red-700 font-bold`}>{error}</div>
    } else {
        return null;
    }
}

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otherPassword, setOtherPassword] = useState("");
    const [error, setError] = useState("");
    const [tryRegister, setTryRegister] = useState(false);
    const [isGdprChecked, setIsGdprChecked] = useState(false);

    const [isGdprVisible, setIsGdprVisible] = useState(false);


    const showGDPR = () => {
        setIsGdprVisible(true);
    };

    useEffect(() => {
        if (!tryRegister) return;
        if (password.length < 8) {
            setError("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
            setTryRegister(false);
            return;
        }
        if (password !== otherPassword) {
            setError("A jelszavak nem egyeznek.");
            setTryRegister(false);
            return;
        }
        if (!isGdprChecked) {
            setError("Az adatvédelmi tájékoztatót el kell fogadni!");
            setTryRegister(false);
            return;
        }
        (async () => {
            setError("Kérjük várjon...");
            const error = await registerUser(email, password)
            if (error) {
                setError(error);
                setTryRegister(false);
            } else {
                setError("A regisztráció sikeres volt. Kérjük, erősítsd meg az email címedet.");
            }
        })();
    }, [tryRegister]);
    return (
        <div className="content">
            <p>Regisztráció</p>
            <div className={`card flex flex-col items-center`}>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} value={email} className={`bg-cardBorderColor`}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"password"}>Jelszó</label>
                    <input type={"password"} id={"password"} value={password} className={`bg-cardBorderColor`}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"otherPassword"}>Jelszó mégegyszer</label>
                    <input type={"password"} id={"otherPassword"} value={otherPassword} className={`bg-cardBorderColor`}
                           onChange={(e) => setOtherPassword(e.target.value)}/>
                </div>
                <div className={`m-2 inline-block`}>
                    <label htmlFor={"gdpr"}></label>
                    <input type={"checkbox"} id={"gdpr"} className={`bg-cardBorderColor`} required={true} value={1}
                           checked={isGdprChecked}
                           onChange={(e) => {
                               setIsGdprChecked(e.target.checked);
                               setIsGdprVisible(false);
                           }}/>
                    <span className={`pl-1 cursor-pointer hover:underline`} onClick={showGDPR}>Elfogadom az adatvédelmi tájékoztatót</span>
                </div>
                {isGdprVisible && (
                    <div className={`max-w-[550px] max-h-[350px] overflow-auto pl-5 pr-5 pt-2 pb-2 m-5 bg-[#fcedd1] rounded-s text-sm`}>
                        <p>Ez az adatvédelmi tájékoztató egy egyetemi projekt részeként készült, és nem szolgál valós célokat.
                            Csupán egy Mesterséges Intelligencia segítségével generált minta.

                            Adatvédelmi Tájékoztató

                            1. Bevezetés
                            A Lakatos Brendon Menhelye elkötelezett az Ön személyes adatainak védelme mellett.
                            Az adatvédelmi tájékoztató célja, hogy részletesen bemutassa, hogyan gyűjtjük, használjuk és védjük az Ön személyes
                            adatait, valamint hogy ismertessük az Ön jogait a GDPR (Általános Adatvédelmi Rendelet) alapján.

                            2. Az általunk gyűjtött adatok
                            A weboldal használata során a következő személyes adatokat gyűjtjük:

                            Telefonszám
                            E-mail cím

                            3. Adatgyűjtés célja
                            Személyes adatait az alábbi célokra gyűjtjük és használjuk fel:

                            Az Ön kérdéseinek és megkereséseinek megválaszolása
                            Adatainak nyilvántartása az örökbefogadási kérelem kezelése érdekében (ha alkalmazható)
                            Jogszabályi kötelezettségek teljesítése

                            4. Az adatkezelés jogalapja
                            Az Ön személyes adatait kizárólag az alábbi jogalapok alapján kezeljük:

                            Az Ön hozzájárulása (például regisztráció esetén)
                            Szerződés teljesítése (például örökbefogadási folyamat során)
                            Jogos érdekek (például a weboldal működtetése és karbantartása)

                            5. Adattovábbítás és megosztás
                            Az Ön személyes adatait harmadik féllel csak az alábbi esetekben osztjuk meg:

                            Amennyiben az adattovábbítás jogszabályi kötelezettségből ered
                            Harmadik feleknek, akik a nevünkben végzik az adatfeldolgozást (például IT szolgáltatók)

                            6. Adatmegőrzési időszak
                            Az Ön személyes adatait csak addig őrizzük meg, amíg az az adatkezelés céljának eléréséhez szükséges, vagy amíg az Ön
                            hozzájárulása érvényben van. A felesleges vagy elavult adatokat biztonságosan töröljük.

                            7. Az Ön jogai
                            Az Ön GDPR szerinti jogai a következők:

                            Hozzáférési jog: Jogában áll tudni, hogy milyen adatokat tárolunk Önről.
                            Helyesbítési jog: Kérheti adatai módosítását vagy javítását.
                            Törlési jog: Kérheti személyes adatainak törlését ("elfeledtetéshez való jog").
                            Adatkezelés korlátozása: Kérheti adatainak kezelésének korlátozását bizonyos esetekben.
                            Adathordozhatósághoz való jog: Kérheti adatai másik szolgáltatóhoz való továbbítását.
                            Hozzájárulás visszavonása: Bármikor visszavonhatja a hozzájárulását, ha az adatkezelés jogalapja a hozzájárulás.

                            8. Biztonsági intézkedések
                            Minden szükséges technikai és szervezési intézkedést megteszünk annak érdekében, hogy személyes adatait védelemmel
                            lássuk el, és megakadályozzuk az adatokhoz való illetéktelen hozzáférést, azok elvesztését vagy jogosulatlan felhasználását.

                            9. Kapcsolatfelvétel
                            Amennyiben kérdése vagy kérése van az adatvédelmi szabályzatunkkal kapcsolatban, vagy gyakorolni szeretné a GDPR
                            szerinti jogait, kérjük, vegye fel velünk a kapcsolatot az alábbi elérhetőségeken:

                            Lakatos Brendon Menhelye
                            1234 Budapest, Kutyus utca 5.
                            +36 30 123 4567
                            info@inabiaf.org

                            11. Panasz benyújtása
                            Ha úgy érzi, hogy személyes adatait nem megfelelően kezeljük, panaszt tehet a helyi adatvédelmi hatóságnál:

                            Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) https://www.naih.hu

                            12. A szabályzat módosítása
                            Fenntartjuk a jogot, hogy ezt az adatvédelmi tájékoztatót időről időre frissítsük. Az esetleges változásokat itt
                            tesszük közzé, így kérjük, látogasson vissza rendszeresen.

                            Utolsó módosítás dátuma: 2024.10.12</p>
                    </div>
                )}
                <Error error={error}/>
                <div className={`m-2`}>
                    <button type={"submit"} className={`btn btn-primary`} onClick={() => setTryRegister(true)}>
                        Regisztráció
                    </button>
                </div>
            </div>
        </div>
    );
}