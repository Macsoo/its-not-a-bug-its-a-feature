import "./globals.css";
import {Itim} from "next/font/google";
import Image from "next/image";
import Link from 'next/link';

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
      <Image src="" alt="logo"/>
      <Link href="/"><h1 className={`cursor-pointer text-3xl md:text-5xl md:m-0 m-2 font-bold italic text-center`}>Lakatos Brendonék Menhelye</h1></Link>
      <div>
        <Link href="/register">
          <button id="register">Regisztráció</button>
        </Link>
        <Link href="/login">
          <button id="login">Belépés</button>
        </Link>
      </div>
    </div>
    <div className={`menu-mobile md:menu`}>
      <div className={`flex flex-col md:flex-row`}>
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
    <div className="content">
      <div className="card">
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}
