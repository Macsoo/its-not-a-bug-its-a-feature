'use client';
import {User} from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import {getUser} from "@/server/supabase";
import {useState} from "react";
import {Session, SessionContext} from "@/components/sessionContext";
import {useServerAction} from "@/utils"
import PopChat from "@/components/chatUI";

export default function Layout(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    useServerAction(async () => {
        setUser(await getUser());
    });

    const messages = ["Hello!", "How can I help you?", "Thank you for reaching out!"];
    const getMessage = (message: string) => {
        console.log("Received message:", message);
        // You can add custom logic here, like updating a message list or sending data to a server
    }

    return <>
        <div className={`header-mobile md:header`}>
            <Image src="/theDog.jpg" width={50} height={50} alt="Logo"/>
            <Link href="/">
                <h1 className={`cursor-pointer text-3xl md:text-5xl md:m-0 m-2 font-bold italic text-center`}>
                    Lakatos Brendonék Menhelye
                </h1>
            </Link>
            <div>
                {!user && (<>
                    <Link href="/register">
                        <button id="register">Regisztráció</button>
                    </Link>
                    <Link href="/login">
                        <button id="login">Belépés</button>
                    </Link>
                </>)}
            </div>
        </div>

        <div className={`w-full md:menu menu-mobile md:flex-row flex-col`}>
            <div className={`flex md:flex-row flex-col`}>
                <Link href="/dogs">
                    <button id="dogs">Kutyáink...</button>
                </Link>
                <Link href="/about">
                    <button id="about">Rólunk</button>
                </Link>
            </div>
            {user && (
                <Link href="/account">
                    <button id="account">Fiókom</button>
                </Link>
            )}
        </div>

        <div className={`w-full p-5`}>
            <SessionContext.Provider value={new Session(user, setUser)}>
                {props.children}
            </SessionContext.Provider>
        </div>

        <div className={`w-full text-secondTextColor p-5`}>
            <footer className={`text-center text-sm`}>
                Ez az oldal egy egyetemi projekt részeként készült, és nem szolgál valós célokat. Minden, a valósággal
                való
                esetleges egyezés teljes mértékben a véletlen műve.
            </footer>
        </div>
        <PopChat messages={messages} getMessage={getMessage} />
    </>;
}