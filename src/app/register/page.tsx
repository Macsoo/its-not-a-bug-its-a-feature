'use client';
import "../globals.css";
import {useState} from "react";
import {registerUser} from "@/server/userRepository";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="content">
            <p>Regisztráció</p>
            <div className="card">
                <input type={"email"} id={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"} className={`btn btn-primary`} onClick={() => registerUser(email, password)}>Login</button>
            </div>
        </div>
    );
}