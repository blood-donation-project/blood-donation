import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaPen, FaUserCheck } from 'react-icons/fa';
import { FaFacebookMessenger } from 'react-icons/fa6';

import Image from '../Image/Image';
import Avatar from '../Image/Avatar';
import ModalWrapper from '../Modal/ModalWrapper';
import ViewPhoto from '../Modal/ModalContent/ViewPhoto';
import UpdateProfile from '../Modal/ModalContent/UpdateProfile';

const ProfileOverview = () => {
    const location = useLocation();
    const pathName = location.pathname.split('/')[3] || '';

    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);
    const [isShowingUpdateProfileModal, setIsShowingUpdateProfieModal] = useState(false);
    const showViewImageModal = () => {
        setIsShowingViewImageModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageModal(false);
    };

    const showUpdateProfileModal = () => {
        setIsShowingUpdateProfieModal(true);
    };

    const hideUpdateProfileModal = () => {
        setIsShowingUpdateProfieModal(false);
    };

    const navProfileLinks = [
        {
            path: `/user/${123}/`,
            title: 'Bài viết',
            lastPath: '',
        },
        {
            path: `/user/${123}/about`,
            title: 'Giới thiệu',
            lastPath: 'about',
        },
        {
            path: `/user/${123}/friends`,
            title: 'Bạn bè',
            lastPath: 'friends',
        },
        {
            path: `/user/${123}/photos`,
            title: 'Ảnh',
            lastPath: 'photos',
        },
    ];

    return (
        <div className="rounded-[14px] overflow-hidden ">
            {/* Background Image */}
            <div className="h-[460px]" onClick={showViewImageModal}>
                <Image
                    src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                    className="w-full h-full object-cover cursor-pointer"
                    alt="avatar"
                />
            </div>

            <div className=" bg-white flex xs:flex-col md:flex-row justify-between p-[14px]">
                {/* Avatar */}
                <div className="xs:flex-col xs:items-center md:flex-row flex">
                    <div>
                        <div
                            className=" w-[144px] h-[144px] rounded-[50%] overflow-hidden border-[3px] dark:border-darkBackground-300 mt-[-50px] cursor-pointer "
                            onClick={showViewImageModal}
                        >
                            <Avatar
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                                className="w-[144px] h-[144px]"
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className="ml-[12px] xs:flex md:block xs:flex-col xs:items-center">
                        <div className="flex-center ">
                            <h3 className="text-[24px] font-semibold leading-[24px] ">Hoàng Xuân Việt</h3>
                        </div>
                        <div className="">
                            <h3 className="text-[12px] font-semibold text-[#65676B] mt-1 ">287 Bạn bè</h3>
                        </div>
                        <div className="flex tyn-media-multiple mt-1">
                            <div className="tyn-media-multiple w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 ">
                                <Avatar
                                    src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                                    className=""
                                    alt="avatar"
                                />
                            </div>
                            <div className="tyn-media-multiple w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 ">
                                <Avatar
                                    src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                    className=""
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xs:mt-3 xs:justify-center md:justify-start md:mt-0 flex items-center">
                    <button
                        className="bg-[#e4e6eb] hover:bg-[#d8d8d8] flex-center rounded-[6px] px-2 py-1"
                        onClick={showUpdateProfileModal}
                    >
                        <FaPen className="mr-2" />
                        Chỉnh sửa trang cá nhân
                    </button>

                    {/* <div className="flex">
                        <button className="bg-[#e4e6eb] hover:bg-[#d8d8d8] mr-2 flex-center rounded-[6px] px-2 py-1">
                            <FaUserCheck className="mr-2" />
                            Bạn bè
                        </button>{' '}
                        <button className="bg-[#e4e6eb] hover:bg-red-600 bg-red-500 text-white flex-center rounded-[6px] px-2 py-1">
                            <FaFacebookMessenger className="mr-2" />
                            Nhắn tin
                        </button>
                    </div> */}
                </div>
            </div>

            <div className="border-t border-[#ccc] px-5">
                <div className="flex">
                    {navProfileLinks.map((nav, i) => {
                        return (
                            <NavLink
                                className={
                                    pathName === nav.lastPath
                                        ? ' flex justify-center items-center border-b-[4px] border-b-red-500 py-2.5 px-3 '
                                        : ' flex justify-center items-center hover:bg-[#ebedf0] rounded-[8px] py-2.5 px-3'
                                }
                                key={i}
                                to={nav.path}
                            >
                                <span
                                    className={
                                        pathName === nav.lastPath
                                            ? 'text-red-500 font-semibold'
                                            : 'text-[#65676B] font-semibold'
                                    }
                                >
                                    {nav.title}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <ModalWrapper
                hideModal={hideViewImageModal}
                isShowing={isShowingViewImageModal}
                bgrColor="bg-[rgba(255,255,255,0.9)]"
            >
                <ViewPhoto hideModal={hideViewImageModal} />
            </ModalWrapper>
            <ModalWrapper
                hideModal={hideUpdateProfileModal}
                isShowing={isShowingUpdateProfileModal}
                bgrColor="bg-[rgba(255,255,255,0.9)]"
            >
                <UpdateProfile hideModal={hideUpdateProfileModal} />
            </ModalWrapper>
        </div>
    );
};

export default ProfileOverview;
