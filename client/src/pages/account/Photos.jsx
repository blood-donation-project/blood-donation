import { useState } from 'react';

import Avatar from '../../components/Image/Avatar';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import ViewPhoto from '../../components/Modal/ModalContent/ViewPhoto';
import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';

const PhotosPage = () => {
    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);

    const showViewImageModal = () => {
        setIsShowingViewImageModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageModal(false);
    };

    return (
        <>
            <NavMenu />
            <div className="mt-[56px]  ">
                <div className="max-w-[1150px] mx-auto  px-4 ">
                    <ProfileOverview />
                </div>
                {/* Body content */}
                <div className="bg-gray-200 pt-4 pb-10  min-h-[calc(100vh_-_636px)]">
                    <div className="max-w-[1150px] mx-auto px-4">
                        <div className="bg-white p-4 rounded-lg overflow-hidden">
                            {/*  */}
                            <div className="flex">
                                <div>
                                    <h3 className="text-[18px] font-bold">Ảnh</h3>
                                </div>
                            </div>

                            {/*  */}
                            <div className="mt-4">
                                <div className="rounded-[8px] overflow-hidden grid grid-cols-6  gap-1">
                                    {/* Map photos data here */}
                                    {new Array(9).fill(0).map((img, i) => {
                                        return (
                                            <div
                                                className=" aspect-square cursor-pointer"
                                                key={i}
                                                onClick={showViewImageModal}
                                            >
                                                <Avatar
                                                    className=" object-cover w-full h-full"
                                                    src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWrapper
                hideModal={hideViewImageModal}
                isShowing={isShowingViewImageModal}
                bgrColor="bg-[rgba(255,255,255,0.9)]"
            >
                <ViewPhoto hideModal={hideViewImageModal} />
            </ModalWrapper>
        </>
    );
};

export default PhotosPage;
