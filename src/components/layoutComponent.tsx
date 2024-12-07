'use client';
import {User} from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import {getUser} from "@/server/supabase";
import React, {useState} from "react";
import {Session, SessionContext} from "@/components/sessionContext";
import {useServerAction} from "@/utils"
import {PopChat} from "@/components/chatUI";
import {logOutUser} from "@/server/userRepository";

export default function Layout(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    useServerAction(async () => {
        setUser(await getUser());
    });

    const handleSignOut = async () => {
        await logOutUser();
        location.reload();
    }

    return <>
        <div className={`header-mobile md:header`}>
            <div className={`relative w-[50px] h-[50px] border-textColor border-2 rounded-[3px]`}>
                <Image src="/theDog.jpg" fill alt="Logo" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }}/>
            </div>

            <Link href="/">
                <h1 className={`cursor-pointer text-3xl md:text-5xl md:m-0 m-2 font-bold italic text-center`}>
                    Lakatos Brendonék Menhelye
                </h1>
            </Link>
            <div
                className={`max-md:flex max-md:flex-col max-md:justify-center max-md:items-center flex flex-row justify-center items-center`}>
                {!user && (<>
                    <Link href="/register">
                        <button id="register">Regisztráció</button>
                    </Link>
                    <Link href="/login">
                        <button id="login">Belépés</button>
                    </Link>

                </>)}
                {user && (
                    <button id={"signOutButton"} onClick={handleSignOut}>Kijelentkezés</button>
                )}
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
                <>
                    <Link href="/account">
                        <button id="account">Fiókom</button>
                    </Link>
                </>


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
        {
            user && user.app_metadata["admin"] !== true && (
                <PopChat user_id={user.id} pops={true} contact={"Admin"}/>)
        }
    </>;
}