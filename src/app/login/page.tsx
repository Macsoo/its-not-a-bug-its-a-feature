'use client';
import "../globals.css";
import {KeyboardEventHandler, useContext, useEffect, useState} from "react";
import {logInUser} from "@/server/userRepository";
import {SessionContext} from "@/components/sessionContext";
import {useRouter} from "next/navigation";

function Error({error}: {error?: string}) {
    if (error) {
        return <div className={`error`}>{error}</div>
    } else {
        return null;
    }
}

export default function LoginPage() {
    const router = useRouter();
    const session = useContext(SessionContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = async () => {
        setError("Kérjük várjon...");
        const user = await logInUser(email, password);
        if (!user) {
            setError("Hiba történt bejelentkezés során.");
        } else {
            session.setUser?.call(session, user);
            router.push('/');
        }
    };
    const enterPress: KeyboardEventHandler = async (e) => {
        if (e.key === "Enter") {
            await login();
        }
    };
    useEffect(() => {
        setError("");
    }, [email, password]);
    return (
        <div className="content">
            <h2>Belépés</h2>
            <div className={`card login-register`}>
                <div className={`m-2 flex flex-col items-start`}>
                    <label className={`max-sm:text-center max-sm:w-full max-sm:mb-1`} htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} value={email} className={`bg-cardBorderColor`}
                           onChange={(e) => setEmail(e.target.value)} onKeyDown={enterPress}/>
                </div>
                <div className={`m-2 flex flex-col items-start`}>
                    <label className={`max-sm:text-center max-sm:w-full max-sm:mb-1`} htmlFor={"password"}>Jelszó</label>
                    <input type={"password"} id={"password"} value={password} className={`bg-cardBorderColor`}
                           onChange={(e) => setPassword(e.target.value)} onKeyDown={enterPress}/>
                </div>
                <Error error={error}/>
                <div className={`m-2`}>
                    <button type={"submit"} className={`btn btn-primary`} onClick={() => login()}>
                        Belépés
                    </button>
                </div>
            </div>
        </div>
    );
}