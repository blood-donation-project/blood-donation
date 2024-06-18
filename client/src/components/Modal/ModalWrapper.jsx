import React from 'react';
import { useEffect } from 'react';

const ModalWrapper = ({ children, isShowing, hideModal, bgrColor = 'bg-[rgba(255,255,255,0.55)]' }) => {
    useEffect(() => {
        isShowing && (document.body.style.overflow = 'hidden');
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isShowing]);

    return (
        isShowing && (
            <div className="modal-wrapper flex-center ">
                <div
                    className={`modal-show modal-bgr ${bgrColor} ${isShowing ? '' : 'modal-hide'}`}
                    onClick={hideModal}
                ></div>
                {children}
            </div>
        )
    );
};

export default ModalWrapper;
