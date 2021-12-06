import React, { Suspense } from "react";

interface IImageLoader {
    imageUrl?: string;
    alt: string;
};

const ImagePlaceholder = () => (
    <div className="h-40 my-auto mx-auto animate-pulse bg-green-500" ></div>
);

const ImageLoader = ({ alt, imageUrl }: IImageLoader) => {
    return (
        <Suspense fallback={ImagePlaceholder} >
            <img className="h-40 mx-auto my-auto" src={imageUrl ? imageUrl : "https://res.cloudinary.com/poorna/image/upload/c_scale,q_auto,w_350/v1637777081/feedly-logo-0bc7db153a894d0aa90b5ed31eec0398.png" } alt={alt} />
        </Suspense>
    );
};

export default ImageLoader;