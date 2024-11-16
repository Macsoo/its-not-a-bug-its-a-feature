import {getImageUrl} from "@/server/pictureRepository";
import {useServerAction} from "@/utils";
import {useState} from "react";
import Image, {ImageProps} from "next/image";

export function DogPicture(props: Omit<ImageProps, 'src'|'alt'> & { src: string }) {
    const [imageSrc, setImageSrc] = useState("/theDog.jpg");
    useServerAction(async () => {
        setImageSrc(await getImageUrl(props.src));
    });
    return <Image src={imageSrc} alt={'Image of a dog.'} width={0} height={0}
                  sizes={`100vw`}
                  className={`w-auto h-full max-h-60 md:max-h-full md:w-full md:h-auto md:max-w-72 image`}/>;
}