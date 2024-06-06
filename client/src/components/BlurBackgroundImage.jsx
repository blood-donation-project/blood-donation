// src/components/BlurBackgroundImage.js
import React from 'react';

const BlurBackgroundImage = ({ src, alt }) => {
    return (
        <div className="relative w-full max-w-4xl mx-auto rounded-xl">
            {/* Nền mờ bên trái */}
            <div
                className="absolute top-0 bottom-1/2 left-0 w-1/2 filter blur-lg"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'left center',
                }}
            ></div>

            {/* Nền mờ bên phải */}
            <div
                className="absolute top-0 bottom-1/2 right-0 w-1/4 filter blur-lg"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                }}
            ></div>

            {/* Nền mờ bên trên */}
            <div
                className="absolute top-0 left-0 right-0 h-1/4 filter blur-lg"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            ></div>

            {/* Ảnh gốc */}
            <div className="relative z-10">
                <img
                
                    src={src}
                    alt={alt}
                    className="w-full h-auto rounded-xl"
                />
            </div>
        </div>
    );
};

export default BlurBackgroundImage;
