'use client';
import "../globals.css";

import {RequestListAdmin, RequestListUser} from "@/components/requestList";
import {useContext, useEffect, useState} from "react";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";
import Link from "next/link";
import UserList from "@/components/userList";
import Image from "next/image";
import {changeUserPhone} from "@/server/userRepository";
import {getUser} from "@/server/supabase";
import {useServerAction} from "@/utils";


export default function AccountPage() {
    const router = useRouter();
    const session = useContext(SessionContext);

    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);

    const [phone, setPhone] = useState("");
    const [phoneEdit, setPhoneEdit] = useState<boolean>(false);

    useServerAction(async () => {
        setPhone(session.user?.phone ?? "");
    });

    useEffect(() => {
        (async () => {
            if (phoneEdit) return;
            const user = await getUser();
            if (user === undefined) return;
            setPhone(session.user?.phone ?? "");
        })();
    }, [phoneEdit, session]);

    if (!session.isSignedIn())
        router.push('/login');
    return (
        <div className="content">
            {session.isSignedIn() &&
                <>
                    <div className="card max-sm:flex max-sm:flex-col max-sm:items-center">
                        <h2>{session.isAdmin() ? "Műveletek:" : "Adataim:"}</h2>
                        {session.isAdmin() && (
                            <div className={`flex flex-row gap-5 max-md:flex-col max-md:gap-2.5 items-center`}>
                                <button onClick={() => {
                                    setShowRequests(true);
                                    setShowUsers(false);
                                }}>Kérvények Kezelése
                                </button>
                                <button onClick={() => {
                                    setShowRequests(false);
                                    setShowUsers(true);
                                }}>Felhasználók Szerkesztése
                                </button>
                                <Link href="/add_dog">
                                    <button>Új Kutya Hozzáadása</button>
                                </Link>
                            </div>
                        )}
                        {session.isUser() && (
                            <div className={`flex flex-row gap-5 max-md:flex-col max-md:gap-2.5 items-center`}>
                                <table className={`userData`}>
                                    <tbody>
                                    <tr>
                                        <td><b>Email:</b></td>
                                        <td>{session.user?.email}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Tel:</b>
                                        </td>
                                        <td>
                                            {!phoneEdit && phone.length === 0 && "Nincs megadva."}
                                            {!phoneEdit && phone.length > 0 && phone}
                                            {phoneEdit && (
                                                <>
                                                    <form onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const phoneVal = "+36-" + (e.currentTarget.querySelector("#phone") as HTMLInputElement).value;
                                                        await changeUserPhone(session.user!.id, phoneVal);
                                                        setPhoneEdit(false);
                                                        setPhone(phoneVal);
                                                    }}>
                                                        +36-<input type="tel" id="phone" pattern="[0-9]{2} [0-9]{3} [0-9]{4}" placeholder={"20 123 4567"} required/>
                                                        <input type="submit" value={String.fromCodePoint(10003)}/>
                                                        <input type={"reset"} value={"X"} onClick={() => {setPhoneEdit(false)}}/>
                                                    </form>
                                                </>
                                            )}
                                        </td>
                                        <td className={"w-fit"}>
                                            {!phoneEdit &&
                                                (
                                                    <button className={"w-fit h-fit p-0"}
                                                            onClick={() => setPhoneEdit(true)}><Image
                                                        src={"/edit-icon.png"}
                                                        alt={"edit-icon"} width={30}
                                                        height={30}/></button>
                                                )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    {(session.isAdmin() && showRequests &&
                            <RequestListAdmin/>
                        )
                        || (session.isAdmin() && (
                            <UserList show={showUsers}/>
                        ))
                    }
                    {session.isUser() && (
                        <RequestListUser user_id={session.user?.id}/>
                    )}
                </>}
        </div>
    );
}