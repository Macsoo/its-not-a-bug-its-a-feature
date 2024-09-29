'use client';
import "../globals.css";
import {useState} from "react";
import {registerUser} from "@/server/userRepository";
import {useSearchParams} from "next/navigation";

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
    const searchParams = useSearchParams();
    const deferror = searchParams.get("fail") ? "Hiba történt a regisztráció során." : undefined;
    const [error, setError] = useState(deferror);
    const registerHandler = () => {
        if (password.length < 8) {
            setError("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
            return;
        }
        if (password !== otherPassword) {
            setError("A jelszavak nem egyeznek.");
            return;
        }
        registerUser(email, password)
    };
    return (
        <div className="content">
            <p>Regisztráció</p>
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
                <div className={`m-2 flex flex-col items-start`}>
                    <label htmlFor={"otherPassword"}>Jelszó mégegyszer</label>
                    <input type={"password"} id={"otherPassword"} value={otherPassword} className={`bg-cardBorderColor`}
                           onChange={(e) => setOtherPassword(e.target.value)}/>
                </div>
                <Error error={error}/>
                <div className={`m-2`}>
                    <button type={"submit"} className={`btn btn-primary`} onClick={registerHandler}>
                        Regisztráció
                    </button>
                </div>
            </form>
        </div>
    );
}