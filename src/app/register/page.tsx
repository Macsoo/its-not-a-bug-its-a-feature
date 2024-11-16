'use client';
import "../globals.css";
import {useEffect, useState} from "react";
import {registerUser} from "@/server/userRepository";

function Error({error}: { error?: string }) {
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

    const readAndAcceptGDPR = () => {
        setIsGdprChecked(true);
        setIsGdprVisible(false)
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
            <h2>Regisztráció</h2>
            <div className={`card login-register`}>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"password"}>Jelszó</label>
                    <input type={"password"} id={"password"} value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"otherPassword"}>Jelszó mégegyszer</label>
                    <input type={"password"} id={"otherPassword"} value={otherPassword}
                           onChange={(e) => setOtherPassword(e.target.value)}/>
                </div>
                <div className={`m-2 inline-block`}>
                    <label htmlFor={"gdpr"}></label>
                    <input type={"checkbox"} required={true} value={1}
                           checked={isGdprChecked}
                           onChange={(e) => {
                               setIsGdprChecked(e.target.checked);
                               isGdprChecked ? setIsGdprVisible(true):setIsGdprVisible(false);
                           }}/>
                    <span className={`pl-1 cursor-pointer hover:underline`} onClick={showGDPR}>Elfogadom az adatvédelmi tájékoztatót</span>
                </div>
                {isGdprVisible && (
                    <div
                        id={"gdpr"}>
                        <button id={"x-button"} onClick={()=>setIsGdprVisible(false)}>X</button>
                        <p>
                            <b>Adatvédelmi Tájékoztató<br/></b><br/>

                            <ol>
                                <li><b>Bevezetés</b><br/>
                                    <p>
                                        A Lakatos Brendon Menhelye elkötelezett az Ön személyes adatainak védelme
                                        mellett.
                                        Az adatvédelmi tájékoztató célja, hogy részletesen bemutassa, hogyan gyűjtjük,
                                        használjuk és
                                        védjük az Ön személyes
                                        adatait, valamint hogy ismertessük az Ön jogait a GDPR (Általános Adatvédelmi
                                        Rendelet)
                                        alapján.
                                    </p>
                                </li>

                                <li><b>Az általunk gyűjtött adatok</b><br/>
                                    <p>
                                        A weboldal használata során a következő személyes adatokat gyűjtjük:<br/>
                                        <ul>
                                            <li>Telefonszám</li>
                                            <li>E-mail cím</li>
                                        </ul>
                                    </p>
                                </li>

                                <li><b>Adatgyűjtés célja</b><br/>
                                    <p>
                                        Személyes adatait az alábbi célokra gyűjtjük és használjuk fel:<br/>
                                        <ul>
                                            <li>Az Ön kérdéseinek és megkereséseinek megválaszolása</li>
                                            <li>Adatainak nyilvántartása az örökbefogadási kérelem kezelése érdekében
                                                (ha alkalmazható)
                                            </li>
                                            <li>Jogszabályi kötelezettségek teljesítése</li>
                                        </ul>
                                    </p>
                                </li>

                                <li><b>Az adatkezelés jogalapja</b><br/>
                                    <p>
                                        Az Ön személyes adatait kizárólag az alábbi jogalapok alapján kezeljük:<br/>
                                        <ul>
                                            <li>Az Ön hozzájárulása (például regisztráció esetén)</li>
                                            <li>Szerződés teljesítése (például örökbefogadási folyamat során)</li>
                                            <li>Jogos érdekek (például a weboldal működtetése és karbantartása)</li>
                                        </ul>
                                    </p>
                                </li>

                                <li><b>Adattovábbítás és megosztás</b><br/>
                                    <p>
                                        Az Ön személyes adatait harmadik féllel csak az alábbi esetekben osztjuk
                                        meg:<br/>
                                        <ul>
                                            <li>Amennyiben az adattovábbítás jogszabályi kötelezettségből ered</li>
                                            <li>Harmadik feleknek, akik a nevünkben végzik az adatfeldolgozást (például
                                                IT
                                                szolgáltatók)
                                            </li>
                                        </ul>
                                    </p>
                                </li>

                                <li><b>Adatmegőrzési időszak</b><br/>
                                    <p>
                                        Az Ön személyes adatait csak addig őrizzük meg, amíg az az adatkezelés céljának
                                        eléréséhez
                                        szükséges, vagy amíg az Ön
                                        hozzájárulása érvényben van. A felesleges vagy elavult adatokat biztonságosan
                                        töröljük.
                                    </p>
                                </li>

                                <li><b>Az Ön jogai</b><br/>
                                    <p>
                                        Az Ön GDPR szerinti jogai a következők:<br/>
                                        <ul>
                                            <li><b>Hozzáférési jog:</b> Jogában áll tudni, hogy milyen adatokat tárolunk
                                                Önről.
                                            </li>
                                            <li><b>Helyesbítési jog:</b> Kérheti adatai módosítását vagy javítását.</li>
                                            <li><b>Törlési jog:</b> Kérheti személyes adatainak törlését
                                                ("elfeledtetéshez való jog").
                                            </li>
                                            <li><b>Adatkezelés korlátozása:</b> Kérheti adatainak kezelésének
                                                korlátozását bizonyos esetekben.
                                            </li>
                                            <li><b>Adathordozhatósághoz való jog:</b> Kérheti adatai másik
                                                szolgáltatóhoz való továbbítását.
                                            </li>
                                            <li><b>Hozzájárulás visszavonása:</b> Bármikor visszavonhatja a
                                                hozzájárulását, ha az adatkezelés jogalapja a hozzájárulás.
                                            </li>
                                        </ul>
                                    </p>
                                </li>

                                <li><b>Biztonsági intézkedések</b><br/>
                                    <p>
                                        Minden szükséges technikai és szervezési intézkedést megteszünk annak érdekében,
                                        hogy személyes adatait védelemmel lássuk el, és megakadályozzuk az adatokhoz
                                        való illetéktelen hozzáférést, azok elvesztését vagy jogosulatlan
                                        felhasználását.
                                    </p>
                                </li>

                                <li><b>Kapcsolatfelvétel</b><br/>
                                    <p>
                                        Amennyiben kérdése vagy kérése van az adatvédelmi szabályzatunkkal kapcsolatban,
                                        vagy gyakorolni szeretné a GDPR szerinti jogait, kérjük, vegye fel velünk a
                                        kapcsolatot az alábbi elérhetőségeken:<br/>
                                        <p className={`pt-4 pl-10 text-left`}>
                                            Lakatos Brendon Menhelye<br/>
                                            1234 Budapest, Kutyus utca 5.<br/>
                                            <a href={"tel:+36 30 123 4567"}>+36 30 123 4567</a><br/>
                                            <a href={"mailto:info@inabiaf.org"}>info@inabiaf.org</a><br/>
                                        </p>
                                    </p>
                                </li>

                                <li><b>Panasz benyújtása</b><br/>
                                    <p>
                                        Ha úgy érzi, hogy személyes adatait nem megfelelően kezeljük, panaszt tehet a
                                        helyi
                                        adatvédelmi hatóságnál:<br/>
                                        <p className={`pt-4 pl-10 text-left`}>
                                            <a href={"https://www.naih.hu"} className={"link"}>Nemzeti Adatvédelmi és
                                                Információszabadság Hatóság (NAIH)</a>
                                        </p>
                                    </p>
                                </li>

                                <li><b>A szabályzat módosítása</b><br/>
                                    <p>
                                        Fenntartjuk a jogot, hogy ezt az adatvédelmi tájékoztatót időről időre
                                        frissítsük. Az
                                        esetleges változásokat itt
                                        tesszük közzé, így kérjük, látogasson vissza rendszeresen.
                                    </p>
                                </li>

                            </ol>
                            <footer>Ez az adatvédelmi tájékoztató egy egyetemi projekt részeként készült, és nem szolgál
                                valós célokat. Csupán egy Mesterséges Intelligencia segítségével generált minta. <br/>
                                Utolsó módosítás dátuma: 2024.10.12
                            </footer>
                        </p>
                        <button onClick={readAndAcceptGDPR}>Elolvastam és elfogadom</button>
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