'use client';
import "../globals.css";
import {useState} from "react";
import {logIn} from "@/server/userRepository";
import {useSearchParams} from "next/navigation";

function Error({error}: {error?: string}) {
    if (error) {
        return <div>{error}</div>
    } else {
        return null;
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const searchParams = useSearchParams();
    const deferror = searchParams.get("fail") ? "Hiba történt a regisztráció során." : undefined;
    return (
        <div className="content">
            <p>Belépés</p>
            <form className={`card flex flex-col items-center`}>
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
                <Error error={deferror}/>
                <div className={`m-2`}>
                    <button type={"submit"} className={`btn btn-primary`} onClick={() => logIn(email, password)}>
                        Belépés
                    </button>
                </div>
            </form>
        </div>
    );
}