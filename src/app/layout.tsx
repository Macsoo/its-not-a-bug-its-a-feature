import "./globals.css";
import Layout from "@/components/layoutComponent";
import {Itim} from "next/font/google";

const itim = Itim({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    fallback: ["cursive"],
});


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="hu">
        <head>
            <title>Lakatos Brendonék Menhelye</title>
        </head>
        <body className={itim.className}>
        <Layout>
            {children}
        </Layout>
        </body>
        </html>
);
}
