import "./globals.css";
import {Itim} from "next/font/google";
import Image from "next/image";

const itim = Itim({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  fallback: ["cursive"],
});

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="hu">
    <head>
      <title>Lakatos Brendonék Menhelye</title>
    </head>
    <body className={itim.className}>
    <div className="header">
      <Image src="" alt="logo"/>
      <h1>Lakatos Brendonék Menhelye</h1>
      <div>
        <button>Regisztráció</button>
        <button>Belépés</button>
      </div>
    </div>
    <div className="menu">
      <div>
        <button>Kutyáink...</button>
        <button>Rólunk</button>
      </div>
      <button>Fiókom</button>
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
