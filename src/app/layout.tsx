import "./globals.css";
import Link from 'next/link';

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="hu">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"/>
            <title> Lakatos Brendonék Menhelye</title>
        </head>
        <body>
        <div className="header">
            <img src="" alt="logo"/>
            <Link href="/"><h1 className="title">Lakatos Brendonék Menhelye</h1></Link>
            <div>
                <Link href="/register"><button id="register">Regisztráció</button></Link>
                <Link href="/login"><button id="login">Belépés</button></Link>
            </div>
        </div>
        <div className="menu">
            <div>
                <Link href="/dogs"><button id="dogs">Kutyáink...</button></Link>
                <Link href="/about"><button id="about">Rólunk</button></Link>
            </div>
            <Link href="/account"><button id="account">Fiókom</button></Link>
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
