'use client';
import "../globals.css";
import {KeyboardEventHandler, useEffect, useState} from "react";
import {logInUser} from "@/server/userRepository";

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
    const [error, setError] = useState("");
    const [tryLogin, setTryLogin] = useState(false);
    const enterPress: KeyboardEventHandler = (e) => {
        if (e.key === "Enter") {
            setTryLogin(true);
        }
    };
    useEffect(() => {
        setError("");
    }, [email, password]);
    useEffect(() => {
        if (!tryLogin) return;
        setTryLogin(false);
        (async () => {
            setError("Kérjük várjon...");
            const error = await logInUser(email, password);
            if (error) {
                setError(error);
            }
        })();
    }, [tryLogin]);
    return (
        <div className="content">
            <p>Belépés</p>
            <div className={`card flex flex-col items-center`}>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} value={email} className={`bg-cardBorderColor`}
                           onChange={(e) => setEmail(e.target.value)} onKeyDown={enterPress}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"password"}>Jelszó</label>
                    <input type={"password"} id={"password"} value={password} className={`bg-cardBorderColor`}
                           onChange={(e) => setPassword(e.target.value)} onKeyDown={enterPress}/>
                </div>
                <Error error={error}/>
                <div className={`m-2`}>
                    <button type={"submit"} className={`btn btn-primary`} onClick={() => setTryLogin(true)}>
                        Belépés
                    </button>
                </div>
            </div>
        </div>
    );
}