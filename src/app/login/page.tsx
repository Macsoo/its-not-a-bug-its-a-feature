'use client';
import "../globals.css";
import {logIn} from "@/server/userRepository";
import {useState} from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="content">
            <p>Belépés</p>
            <div className="card">
                <input type={"email"} id={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"} className={`btn btn-primary`} onClick={() => logIn(email, password)}>Login</button>
            </div>
        </div>
    );
}