import React from 'react';
import { useState, useEffect } from 'react';
import imageError from '../../assets/images/image-error.png';

const Image = ({ className, src, alt }) => {
    const [_fallBack, setFallBack] = useState(null);
    useEffect(() => {
        if (src) {
            setFallBack(null);
        } else {
            setFallBack(imageError);
        }
    }, [src]);
    const handleError = () => setFallBack(imageError);
    return <img className={className} src={_fallBack || src} alt={alt} onError={handleError} />;
};
export default Image;
