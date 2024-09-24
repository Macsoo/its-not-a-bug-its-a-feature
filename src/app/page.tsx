'use client';
import "./globals.css";
import {database} from "@/server/database";
import {useState} from "react";
import {useServerAction} from "@/utils";


export default function Home() {
    const [databaseConnection, setDatabaseConnection] = useState("Az adatbázis kapcsolat tölt...");
    useServerAction(async () => {
        setDatabaseConnection("Az adatbázis kapcsolat: " + await database());
    });
    return (
        <div className={`content`}>
        <div className="card">
            <h2>Üdvözöljük a Lakatos Brendonék Menhelyének weboldalán!</h2>
            <p>Örömmel látjuk, hogy ellátogatott hozzánk!</p>
            <p>A Lakatos Brendonék Menhelyének célja, hogy biztonságos és szeretetteljes
                környezetet biztosítson a rászoruló kutyák számára. Minden kutya egyedi történettel és személyiséggel
                rendelkezik, és mindegyikük megérdemli a második esélyt.</p>

            <p>Fedezze fel kutyáinkat, akik várják, hogy új otthonra leljenek! Böngésszen a profilok között, és ha
                megtalálja az ideális társát, ne habozzon kapcsolatba lépni velünk. Önnek is lehetősége van segíteni:
                támogathat minket önkéntes munkával vagy adományokkal.</p>

            <p>Köszönjük, hogy hozzájárul a kutyák boldogságához és jólétéhez!</p>
            <p>{databaseConnection}</p>
        </div>
        </div>
    );
}
