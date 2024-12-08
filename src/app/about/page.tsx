'use client';
import "../globals.css";

import React, { useState, useEffect } from 'react';

const ResponsiveTable = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isSmallScreen) {
        return (
            <div className="text-center">
                <div className={`py-2`}>
                    <b>Elérhetőség</b>
                    <p><b>Cím:</b> 1234 Budapest, Kutyus utca 5.</p>
                    <p><b>Telefon:</b> +36 30 123 4567</p>
                    <p><b>Email:</b> info@inabiaf.org</p>
                </div>
                <div className={`py-2`}>
                    <b>Nyitvatartás</b>
                    <p><b>Hétfő - Péntek:</b> 9:00 - 18:00</p>
                    <p><b>Szombat:</b> 10:00 - 16:00</p>
                    <p><b>Vasárnap:</b> Zárva</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full text-center flex md:flex-row gap-4 md:justify-between flex-col items-center">
            <table className="m:w-1/8 w-full">
                <thead>
                <tr>
                    <th className="py-2" colSpan={2}>
                        Elérhetőség
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-right">
                        <b>Cím:</b>
                    </td>
                    <td className="text-left">1234 Budapest, Kutyus utca 5.</td>
                </tr>
                <tr>
                    <td className="text-right">
                        <b>Telefon:</b>
                    </td>
                    <td className="text-left">+36 30 123 4567</td>
                </tr>
                <tr>
                    <td className="text-right">
                        <b>Email:</b>
                    </td>
                    <td className="text-left">info@inabiaf.org</td>
                </tr>
                </tbody>
            </table>
            <table className="m:w-1/4 w-full">
                <thead>
                <tr>
                    <th className="py-2 w-1/2 col-span-2" colSpan={2}>
                        Nyitvatartás
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-right">
                        <b>Hétfő - Péntek:</b>
                    </td>
                    <td className="text-left">9:00 - 18:00</td>
                </tr>
                <tr>
                    <td className="text-right">
                        <b>Szombat:</b>
                    </td>
                    <td className="text-left">10:00 - 16:00</td>
                </tr>
                <tr>
                    <td className="text-right">
                        <b>Vasárnap:</b>
                    </td>
                    <td className="text-left">Zárva</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default function AboutPage() {
    return (
        <div className="content">
            <div className={`card flex flex-col gap-4`}>
                    <h2 className={`text-center`}>Célunk...</h2>
                    ...hogy biztonságos és szeretetteljes
                    környezetet biztosítsunk az elhagyott, sérült vagy gazdátlan kutyáknak, amíg új, végleges otthonra
                    nem
                    találnak. Személyzetünk minden nap azon dolgozik, hogy a menhelyen élő kutyáknak a lehető legjobb
                    ellátást nyújtsuk, valamint hogy a felelős örökbefogadás fontosságára felhívjuk a figyelmet.
                <h2 className={`text-center`}>Kapcsolat</h2>
                <ResponsiveTable/>
                <p className={`text-center`}>
                    Látogass el hozzánk, ha örökbefogadnál egy hűséges társat, vagy ha szeretnél többet megtudni
                    arról, hogyan segíthetsz a rászoruló állatokon!<br/> és érdeklődésedet előre is köszönjük!
                </p>

            </div>
        </div>
    );
}
