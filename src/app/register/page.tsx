'use client';
import "../globals.css";
import {useEffect, useState} from "react";
import {registerUser} from "@/server/userRepository";

function Error({error}: {error?: string}) {
    if (error) {
        return <div>{error}</div>
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
            <p>Regisztráció</p>
            <div className={`card flex flex-col items-center`}>
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
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"otherPassword"}>Jelszó mégegyszer</label>
                    <input type={"password"} id={"otherPassword"} value={otherPassword} className={`bg-cardBorderColor`}
                           onChange={(e) => setOtherPassword(e.target.value)}/>
                </div>
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