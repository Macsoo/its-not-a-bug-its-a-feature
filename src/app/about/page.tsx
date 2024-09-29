'use client';
import "../globals.css";

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
                <div className={`w-full text-center flex md:flex-row gap-4 md:justify-between flex-col items-center`}>
                    <table className={`m:w-1/8 w-full`}>
                        <thead>
                        <tr>
                            <th className={`py-2`} colSpan={2}>
                                Elérhetőség
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={`text-right`}>
                                <b>Cím:</b>
                            </td>
                            <td className={`text-left`}>
                                1234 Budapest, Kutyus utca 5.
                            </td>
                        </tr>
                        <tr>
                            <td className={`text-right`}>
                                <b>Telefon:</b>
                            </td>
                            <td className={`text-left`}>
                                +36 30 123 4567
                            </td>
                        </tr>
                        <tr>
                            <td className={`text-right`}>
                                <b>Email:</b>
                            </td>
                            <td className={`text-left`}>
                                info@lakatosbrendonmenhely.hu
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className={`m:w-1/4 w-full`}>
                        <thead>
                        <tr>
                            <th className="py-2 w-1/2 col-span-2" colSpan={2}>
                                Nyitvatartás
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={`text-right`}>
                                <b>Hétfő - Péntek:</b>


                            </td>
                            <td className={`text-left`}>
                                9:00 - 18:00
                            </td>
                        </tr>
                        <tr>
                            <td className={`text-right`}>
                                <b>Szombat:</b>
                            </td>
                            <td className={`text-left`}>
                                10:00 - 16:00
                            </td>
                        </tr>
                        <tr>
                            <td className={`text-right`}>
                                <b>Vasárnap:</b>
                            </td>
                            <td className={`text-left`}>
                                Zárva
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p className={`text-center`}>
                    Látogass el hozzánk, ha örökbefogadnál egy hűséges társat, vagy ha szeretnél többet megtudni
                    arról, hogyan segíthetsz a rászoruló állatokon!<br/> és érdeklődésedet előre is köszönjük!
                </p>
            </div>
        </div>
    );
}
