import "./globals.css";
import {Itim} from "next/font/google";
import Image from "next/image";
import Link from 'next/link';
import {MobileNav, WideScreenNav} from "@/components/navigation";


const itim = Itim({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    fallback: ["cursive"],
});


export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="hu">
        <head>
            <title> Lakatos Brendonék Menhelye</title>
        </head>
        <body className={itim.className}>
        <div className={`header-mobile md:header`}>
            <Image src=""
                   width={50}
                   height={50}
                   alt="Logo"/>
            <Link href="/"><h1
                className={`cursor-pointer text-3xl md:text-5xl md:m-0 m-2 font-bold italic text-center`}>Lakatos
                Brendonék Menhelye</h1></Link>
                <div>
                    <Link href="/register">
                        <button id="register">Regisztráció</button>
                    </Link>
                    <Link href="/login">
                        <button id="login">Belépés</button>
                    </Link>
                </div>
        </div>
        <div className={`md:block md:w-full hidden`}>
            <WideScreenNav/>
        </div>
        <div className={`md:hidden w-full`}>
            <MobileNav/>
        </div>
        <div className={`w-full p-5`}>

            {children}
        </div>
        <div className={`w-full text-secondTextColor p-5`}>
            <footer className={`text-center text-sm`}>Ez az oldal egy egyetemi projekt részeként készült, és nem szolgál
                valós célokat. Minden, a valósággal való esetleges egyezés teljes mértékben a véletlen műve.
            </footer>
        </div>
        </body>
        </html>
    )
        ;
}
