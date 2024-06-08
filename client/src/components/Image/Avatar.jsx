import React from 'react';
import { useState, useEffect } from 'react';
import avatarError from '../../assets/images/avatar-error.png';

const Avatar = ({ className, src, alt }) => {
    const [_fallBack, setFallBack] = useState(null);
    useEffect(() => {
        if (src) {
            setFallBack(null);
        } else {
            setFallBack(avatarError);
        }
    }, [src]);
    const handleError = () => setFallBack(avatarError);
    return <img className={className} src={_fallBack || src} alt={alt} onError={handleError} />;
};
export default Avatar;
