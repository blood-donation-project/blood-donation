import { useState } from 'react';
import NavMenu from '../components/NavMenu';
import { Link } from 'react-router-dom';
import { IoMdImages } from 'react-icons/io';
import { MdInsertEmoticon } from 'react-icons/md';

import PostLoading from '../components/LoadingSkeleton/Post/PostLoading';
import Post from '../components/Post/Post';
import ModalWrapper from '../components/Modal/ModalWrapper';
import CreatePost from '../components/Modal/ModalContent/CreatePost';
import Avatar from '../components/Image/Avatar';
import UserFriendLoading from '../components/LoadingSkeleton/User/UserFriendLoading';
import UserSuggestLoading from '../components/LoadingSkeleton/User/UserSuggestLoading';

const HomePage = () => {
    const [isShowingModal, setIsShowingModal] = useState(false);

    const showModal = () => {
        setIsShowingModal(true);
    };

    const hideModal = () => {
        setIsShowingModal(false);
    };

    return (
        <>
            {/* Header */}
            <NavMenu />
            {/* Body */}
            <div className="flex-center mt-[56px] bg-[#f0f2f5] ">
                {/* Sidebar left */}
                <div className="w-[360px] h-screen py-3 fixed left-0 top-[56px] bg-[#f0f2f5]">
                    <div className="pl-2 grid">
                        <Link className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-l-md" to="/">
                            <div>
                                <Avatar
                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                    src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBkfNMc23WtT5ya7AaKej7YpsHqnqvNuxDYHg7CIe0NOQ&oe=664955EB"
                                    alt="avatar"
                                />
                            </div>
                            <div className="ml-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Hoàng Xuân Việt</p>
                            </div>
                        </Link>
                        {/* Cần thêm gì thì thêm dưới này */}
                        <></>
                    </div>
                </div>

                <div className="w-full max-w-[calc(100vw-_720px)] flex min-h-screen flex-col items-center py-3 px-4  ">
                    {/* Div đăng bài */}
                    <div className="py-2 px-3 bg-white rounded-[8px] shadow h-fit max-w-[590px] w-full ">
                        <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                            <Avatar
                                className="w-9 h-9 rounded-[50%]"
                                src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBYsM4yz19uc41fbzydD1VTIBULdeECHmUiWi3CaucLUA&oe=6649FEAB"
                                alt="avatar"
                            />
                            <div
                                className="w-full ml-3 flex items-center bg-[#f0f2f5] rounded-[16px] px-3 py-1 cursor-pointer"
                                onClick={showModal}
                            >
                                <span className="text-[#65676B]">Việt ơi, bạn đang nghĩ gì thế?</span>
                            </div>
                        </div>
                        <div className="flex py-1">
                            <label
                                className="flex-center w-[50%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5"
                                onClick={showModal}
                                htmlFor="image"
                            >
                                <IoMdImages className=" text-green-400 text-[18px]" />
                                <span className="ml-1 font-semibold text-[15px] text-[#65676B]">Ảnh/video</span>
                            </label>
                            <div className="flex-center w-[50%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5">
                                <MdInsertEmoticon className=" text-orange-400 text-[20px]" />
                                <span className="ml-1 font-semibold text-[15px] text-[#65676B]">Cảm xúc/hoạt động</span>
                            </div>
                        </div>
                    </div>

                    {/* List bài đăng */}
                    <div className="h-fit max-w-[590px] w-full mt-3">
                        {/*Bài đăng  */}
                        <Post />

                        {/* Post Loading */}
                        <PostLoading />
                    </div>
                </div>

                {/* Sidebar right */}
                <div className="w-[360px] h-screen  py-3 fixed top-[56px] right-0  bg-[#f0f2f5]">
                    {/* List bạn bè  */}
                    <div className="pb-1 border-b border-b-[#ccc]">
                        <div className="pl-4">
                            <h3 className="font-semibold text-[15px] text-[#65676B]">Bạn bè</h3>
                        </div>

                        <div className=" py-2 pl-2 grid">
                            <Link className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md" to="/">
                                <div>
                                    <Avatar
                                        className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                        src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/329007355_5877024832378876_105945048897552486_n.jpg?stp=dst-jpg_p111x111&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lX3PfZ5K7WsQ7kNvgF8tMYE&_nc_ht=scontent.fhan2-3.fna&oh=00_AYCnQUCyq4KDq4Bt3bEbopzMjdxg8nMxgBPhfHuOmOEM1Q&oe=664A370D"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="ml-2">
                                    <p className="text-[14px] font-semibold leading-[14px]">Phan Tuấn</p>
                                </div>
                            </Link>
                            <Link className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md" to="/">
                                <div>
                                    <Avatar
                                        className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                        src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/423237119_2076174816084793_2700967333954066592_n.jpg?stp=dst-jpg_p120x120&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LoocIRz9v9YQ7kNvgGDx-wi&_nc_ht=scontent.fhan2-3.fna&oh=00_AYCETmRTOEr2VnRrY9F0aAV3pSkzOwflTdFUpJ7b80K3kg&oe=664A194E"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="ml-2">
                                    <p className="text-[14px] font-semibold leading-[14px]">Ngân Phạm</p>
                                </div>
                            </Link>

                            {/* User friend loading */}
                            <UserFriendLoading />
                        </div>
                    </div>

                    {/* List người dùng gợi ý */}
                    <div className="pb-1 pt-2 ">
                        <div className="pl-4">
                            <h3 className="font-semibold text-[15px] text-[#65676B]">Gợi ý cho bạn</h3>
                        </div>
                        <div className=" py-2 pl-2 grid">
                            <Link className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md" to="/">
                                <div>
                                    <Avatar
                                        className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                        src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/440974567_1500825014119362_8620000110901620035_n.jpg?stp=dst-jpg_p111x111&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=t7jnvwT8jkUQ7kNvgE2Fnnm&_nc_ht=scontent.fhan2-5.fna&oh=00_AYD7elpmbuKg7k2JEZMdWEIxalb-BFqEKa-lhMfDxPer6A&oe=664A1665"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="ml-2">
                                    <p className="text-[14px] font-semibold leading-[12px]">Dương Quốc Cần</p>
                                    <span className="text-[11px] text-[#65676B]">Gợi ý cho bạn</span>
                                </div>
                            </Link>
                            <Link className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md" to="/">
                                <div>
                                    <Avatar
                                        className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                        src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/356388448_3601714933437980_2259126593281232293_n.jpg?stp=dst-jpg_p111x111&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9qvo_P2KIWgQ7kNvgERBqC2&_nc_ht=scontent.fhan2-3.fna&oh=00_AYAdSWN7lHP-dQMxdTxQZWy_MSgm7lUTSBLkrvwnNNcCRw&oe=664A0486"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="ml-2">
                                    <p className="text-[14px] font-semibold leading-[12px]">Hoàng Quân</p>
                                    <span className="text-[11px] text-[#65676B]">Gợi ý cho bạn</span>
                                </div>
                            </Link>

                            {/* User suggest loading */}
                            <UserSuggestLoading />
                        </div>
                    </div>
                </div>
            </div>
            <ModalWrapper isShowing={isShowingModal}>
                <CreatePost hideModal={hideModal} />
            </ModalWrapper>
        </>
    );
};

export default HomePage;
