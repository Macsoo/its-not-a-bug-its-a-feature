import "@/app/globals.css"

export default function DogCard() {
    return (
        <div className="card-dog">
            <div>
                Kép
            </div>
            <div id="dog-text" className={`flex flex-col items-center justify-around md:flex-row`}>
                <div>
                    Adatok
                </div>
                <div>
                    Leírás
                </div>
            </div>
            <div>
                Gomb(ok)
            </div>
        </div>
    )
}