import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { AiOutlineLike } from 'react-icons/ai';

import ModalWrapper from '../Modal/ModalWrapper';
import PostDetails from '../Modal/ModalContent/PostDetails';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserPreview from '../User/UserPreview';
import Avatar from '../Image/Avatar';

// Data
const Post = () => {
    const [isShowingModal, setIsShowingModal] = useState(false);

    const showModal = () => {
        if (isShowingModal === false) {
            setIsShowingModal(true);
        }
    };

    const hideModal = () => {
        setIsShowingModal(false);
    };

    return (
        <div className=" bg-white rounded-[8px] shadow mb-3  ">
            <div className="px-2 py-3 ">
                {/* Thông tin người đăng */}
                <div className="flex">
                    <div>
                        <Tippy
                            interactive={true}
                            placement="bottom-start"
                            delay={[400, 0]}
                            render={(attrs) => (
                                <div
                                    className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <UserPreview />
                                </div>
                            )}
                        >
                            <Link to={'/user/123'}>
                                <Avatar
                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                    src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/441185472_859553369550576_4197182993968662181_n.png?stp=dst-png_p120x120&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4FR8PvJr70sQ7kNvgH0CKF-&_nc_ht=scontent.fhan20-1.fna&oh=00_AYC5XrkeyvJ_TzA89BxoTt2ENAlVvOu0ufQ7WRq8Uu9t_w&oe=664A21C6"
                                    alt="avatar"
                                />
                            </Link>
                        </Tippy>
                    </div>
                    <div className="ml-2 flex flex-col">
                        <Link className="text-[14px] font-semibold leading-[14px] hover:underline" to={'/user/123'}>
                            TOP Comments
                        </Link>
                        <span className="text-[12px] text-[#65676B]">17 phút</span>
                    </div>
                </div>

                {/* Mô tả bài đăng */}
                <div className="">
                    <span className="text-[14px]">35nam gửi 191 các con vợ ơi. Nhanhhhh</span>
                </div>
            </div>

            {/* Hình ảnh/Video nếu có */}
            <div className="bg-[#b2aea6] flex-center cursor-pointer" onClick={showModal}>
                <img
                    className=" max-w-full max-h-[660px]"
                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/441503496_980602770314399_3482545290015741587_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IQXpsNoV9sEQ7kNvgHbyUXS&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBg5ffK9JAA6sq1WhdFBP2kY1qQXlDI509igk48FMBtxQ&oe=664A0C13 "
                    alt=""
                />
            </div>

            {/* Bình luận/cảm xúc */}
            <div className="px-2 py-1">
                <div className="flex py-1 justify-between border-b border-b-[#ccc]">
                    <span className="text-[14px] text-[#65676B]">14 yêu thích</span>
                    <span className="text-[14px] text-[#65676B] cursor-pointer hover:underline">176 bình luận</span>
                </div>
                <div className="flex pt-1">
                    <div className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]">
                        <AiOutlineLike />
                        <span className=" text-[15px]  ml-1 font-semibold text-[#65676B]">Thích</span>
                    </div>
                    <div
                        className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]"
                        onClick={showModal}
                    >
                        <FaRegComment />
                        <span className=" text-[15px]  ml-1 font-semibold text-[#65676B]">Bình luận</span>
                    </div>
                </div>
            </div>
            <ModalWrapper isShowing={isShowingModal} hideModal={hideModal}>
                <PostDetails hideModal={hideModal} />
            </ModalWrapper>
        </div>
    );
};

export default Post;
