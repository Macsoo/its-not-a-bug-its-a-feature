import "./globals.css";
import Image from "next/image";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className={`content flex flex-col justify-center items-center`}>
            <h2> A keresett oldal nem található :( </h2>
            <div className="imageContainer w-full">
                <Image src={"/404.jpg"} alt={"Not Found - 404"}
                       width={0} height={0} sizes={"100vh"} className={`image w-5/12`}/>
            </div>
            <footer>Kép forrása: <Link href={"https://httpstatusdogs.com/404-not-found"}
                                       className={"hover:underline hover:cursor-pointer"}>HTTP Status Dogs</Link> </footer>
        </div>
    )
}