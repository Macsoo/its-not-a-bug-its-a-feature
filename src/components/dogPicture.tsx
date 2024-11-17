import {getImageUrl} from "@/server/pictureRepository";
import {useServerAction} from "@/utils";
import {useState} from "react";
import Image, {ImageProps} from "next/image";

export function DogPicture(props: Omit<ImageProps, 'src'|'alt'> & { src: string }) {
    const [imageSrc, setImageSrc] = useState("/theDog.jpg");
    useServerAction(async () => {
        setImageSrc(await getImageUrl(props.src));
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {src: _, ...rest} = props;
    return <Image src={imageSrc} alt={'Image of a dog.'} {...rest}/>;
}