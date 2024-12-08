import {getImageUrl} from "@/server/pictureRepository";
import Image, {ImageProps} from "next/image";
import {useState} from "react";
import {useServerAction} from "@/utils";

export function DogPicture(props: Omit<ImageProps, 'src'|'alt'> & { src: string }) {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const {src, ...rest} = props;
    useServerAction(async () => {
        const image = await getImageUrl(src);
        setImageSrc(image);
        setLoading(false);
    });
    return (!loading && <Image src={imageSrc} alt={'Image of a dog.'} {...rest} placeholder={'empty'}/>);
}