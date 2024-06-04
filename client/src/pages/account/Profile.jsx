import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProfileFriend from '../../components/User/UserFriendProfile';
import { MdInsertEmoticon } from 'react-icons/md';
import { IoMdImages } from 'react-icons/io';

import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Avatar from '../../components/Image/Avatar';
import CreatePost from '../../components/Modal/ModalContent/CreatePost';
import Post from '../../components/Post/Post';
import ViewPhoto from '../../components/Modal/ModalContent/ViewPhoto';
import PostLoading from '../../components/LoadingSkeleton/Post/PostLoading';

const ProfilePage = () => {
    const divRef = useRef(null);
    const [isShowingCreatePostModal, setIsShowingCreatePostModal] = useState(false);
    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);

    const [divHeight, setDivHeight] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight);
        }
    }, []);

    const showCreatePostModal = () => {
        setIsShowingCreatePostModal(true);
    };

    const hideCreatePostModal = () => {
        setIsShowingCreatePostModal(false);
    };

    const showViewImageModal = () => {
        setIsShowingViewImageModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageModal(false);
    };

    let height;
    if (divHeight / window.innerHeight > 1) {
        height = Math.round((divHeight / window.innerHeight - 1) * window.innerHeight + 44) * -1;
    } else {
        if (divHeight + 100 < window.innerHeight) {
            height = 56;
        } else {
            height = window.innerHeight + 44 - divHeight;
        }
    }

    return (
        <>
            <NavMenu />
            <div className="mt-[56px]  ">
                <div className="  max-w-[1150px] mx-auto px-4  ">
                    {/* Profice cover */}
                    <ProfileOverview />
                </div>
                {/*  */}
                <div className="bg-gray-200 pt-4 pb-10 ">
                    <div className="max-w-[1150px] mx-auto md:px-4">
                        <div className="flex xs:flex-col md:flex-row justify-between ">
                            {/* Content left */}
                            <div
                                className={` xs:w-[100%] md:w-[39%] md:px-3  h-fit  md:sticky `}
                                style={{ top: `${height}px` }}
                                ref={divRef}
                            >
                                {/* List Photos */}
                                <div className="bg-white  px-4 py-2 md:rounded-lg mb-3">
                                    <div className="flex justify-between py-1.5">
                                        <h3 className="font-bold">Ảnh</h3>
                                        <Link
                                            className="text-red-500 hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                            to={`/user/${123}/photos`}
                                        >
                                            Xem tất cả ảnh
                                        </Link>
                                    </div>
                                    {/* Map photo data here */}
                                    <div className="rounded-[8px] overflow-hidden grid grid-cols-3 grid-cols-3 gap-1">
                                        <div className=" aspect-square cursor-pointer" onClick={showViewImageModal}>
                                            <Avatar
                                                className=" object-cover w-full h-full"
                                                src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                                                alt=""
                                            />
                                        </div>
                                        <div className=" aspect-square cursor-pointer" onClick={showViewImageModal}>
                                            <Avatar
                                                className=" object-cover w-full h-full"
                                                src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                                                alt=""
                                            />
                                        </div>
                                        <div className=" aspect-square cursor-pointer" onClick={showViewImageModal}>
                                            <Avatar
                                                className=" object-cover w-full h-full"
                                                src="https://images.unsplash.com/photo-1587355760421-b9de3226a046?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* List Friends */}
                                <div className="bg-white  px-4 py-2 md:rounded-lg mb-3">
                                    <div className="flex justify-between py-1.5">
                                        <h3 className="font-bold">Bạn bè</h3>
                                        <Link
                                            className="text-red-500 hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                            to={`/user/${123}/friends`}
                                        >
                                            Xem tất cả bạn bè
                                        </Link>
                                    </div>
                                    {/* Map  friends data here */}
                                    <div className="rounded-[8px] grid grid-cols-3 gap-1 ">
                                        {new Array(9).fill(0).map((user, i) => {
                                            return <UserProfileFriend key={i} />;
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Content right */}
                            <div className="xs:w-[100%] md:w-[60%]  md:px-4 ">
                                <div className="py-2 px-3  md:rounded-[8px] shadow h-fit  w-full bg-white  ">
                                    <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                                        <Avatar
                                            className="w-9 h-9 rounded-[50%]"
                                            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBYsM4yz19uc41fbzydD1VTIBULdeECHmUiWi3CaucLUA&oe=6649FEAB"
                                            alt="avatar"
                                        />
                                        <div
                                            className="w-full ml-3 flex items-center bg-[#f0f2f5] rounded-[16px] px-3 py-1 cursor-pointer"
                                            onClick={showCreatePostModal}
                                        >
                                            <span className="text-[#65676B]">Việt ơi, bạn đang nghĩ gì thế?</span>
                                        </div>
                                    </div>
                                    <div className="flex py-1">
                                        <label
                                            className="flex-center w-[50%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5"
                                            onClick={showCreatePostModal}
                                            htmlFor="image"
                                        >
                                            <IoMdImages className=" text-green-400 text-[18px]" />
                                            <span className="ml-1 font-semibold text-[15px] text-[#65676B]">
                                                Ảnh/video
                                            </span>
                                        </label>
                                        <div className="flex-center w-[50%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5">
                                            <MdInsertEmoticon className=" text-orange-400 text-[20px]" />
                                            <span className="ml-1 font-semibold text-[15px] text-[#65676B]">
                                                Cảm xúc/hoạt động
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-fit  w-full mt-3">
                                    {/*Posts  */}
                                    <Post />

                                    {/* Post loading  */}
                                    <PostLoading />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWrapper hideModal={hideCreatePostModal} isShowing={isShowingCreatePostModal}>
                <CreatePost hideModal={hideCreatePostModal} />
            </ModalWrapper>
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

export default ProfilePage;
