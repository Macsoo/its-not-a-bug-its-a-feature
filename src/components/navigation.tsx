'use client';
import "@/app/globals.css"
import Link from "next/link";
import {useState} from "react";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [menu, setMenu] = useState("↓");

    const toggle = () => {
        setIsOpen(!isOpen);
        setMenu(isOpen ? "↓" : "↑");
    };
    return (
        <div className={`menu-mobile`}>
            {isOpen && (
                <>
                    <div className={`flex flex-col`}>
                        <Link href="/dogs">
                            <button id="dogs" onClick={toggle}>Kutyáink...</button>
                        </Link>
                        <Link href="/about">
                            <button id="about" onClick={toggle}>Rólunk</button>
                        </Link>
                    </div>
                    <Link href="/account">
                        <button id="account" onClick={toggle}>Fiókom</button>
                    </Link>
                </>
            )}
            <button onClick={toggle} id="menu-toggle">{menu}</button>
        </div>
    )
}

export function WideScreenNav() {
    return (
        <div className={`menu`}>
            <div className={`flex flex-row`}>
                <Link href="/dogs">
                    <button id="dogs">Kutyáink...</button>
                </Link>
                <Link href="/about">
                    <button id="about">Rólunk</button>
                </Link>
            </div>
            <Link href="/account">
                <button id="account">Fiókom</button>
            </Link>
        </div>
    )

}
