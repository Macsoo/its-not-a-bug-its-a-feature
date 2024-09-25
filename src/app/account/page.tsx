'use client';
import "../globals.css";
import RequestCard from "@/components/requestCard";
import {currentRole} from "@/components/roles";

export default function AccountPage() {
    return (
        <div className="content">
            <div className="card">
                <h2>Jogosultság: {currentRole}</h2>
            </div>
            <RequestCard key={0}/>
        </div>
    );
}