import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Tippy from '@tippyjs/react/headless';
import { AiOutlineLike } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { IoCameraOutline } from 'react-icons/io5';
import { BsFillSendFill } from 'react-icons/bs';

import UserPreview from '../../User/UserPreview';
import PostComment from '../../Comment/PostComment';

const PostDetails = ({ hideModal }) => {
    const [comment, setComment] = useState('');
    const [commentLength, setCommentLength] = useState(0);

    const onChangeComment = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setCommentLength(value.length);
        setComment(value);
    };

    const onKeyDownPostComments = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            setComment(comment + '\n');
        } else if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className=" z-[9] w-[700px] h-[calc(100vh_-_60px)] bg-white rounded-[10px] shadow shadow-black  relative">
            <div className=" overflow-y-auto w-full h-full rounded-[10px]">
                <div className=" rounded-t-[10px] h-[44px] text-center border-b boder-b-[#ccc] absolute bg-white left-0 right-0 top-0">
                    <h3 className="font-bold text-[20px]">Bài viết của TOP Comments</h3>
                    <div
                        className="w-8 h-8 bg-[#e1e2e4] rounded-[50%] flex-center cursor-pointer absolute right-2 top-2"
                        onClick={hideModal}
                    >
                        <IoMdClose />
                    </div>
                </div>
                <div className="mt-11 mb-[120px]">
                    {/* Post detail */}
                    <div className=" border-b boder-b-[#ccc] ">
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
                                            <Link to={'/'}>
                                                <img
                                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                    src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/441185472_859553369550576_4197182993968662181_n.png?stp=dst-png_p120x120&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4FR8PvJr70sQ7kNvgH0CKF-&_nc_ht=scontent.fhan20-1.fna&oh=00_AYC5XrkeyvJ_TzA89BxoTt2ENAlVvOu0ufQ7WRq8Uu9t_w&oe=664A21C6"
                                                    alt="avatar"
                                                />
                                            </Link>
                                        </Tippy>
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-[14px] font-semibold leading-[14px]">TOP Comments</p>
                                        <span className="text-[12px] text-[#65676B]">17 phút</span>
                                    </div>
                                </div>
                                {/* Mô tả bài đăng */}
                                <div className="">
                                    <span className="text-[14px]">35nam gửi 191 các con vợ ơi. Nhanhhhh</span>
                                </div>
                            </div>
                            {/* Hình ảnh/Video nếu có */}
                            <div className="bg-[#b2aea6] flex-center">
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
                                    <span className="text-[14px] text-[#65676B] cursor-pointer hover:underline">
                                        176 bình luận
                                    </span>
                                </div>
                                <div className="flex pt-1">
                                    <div className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]">
                                        <AiOutlineLike />
                                        <span className=" text-[15px]  ml-1 font-semibold text-[#65676B]">Thích</span>
                                    </div>
                                    <div className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]">
                                        <FaRegComment />
                                        <span className=" text-[15px]  ml-1 font-semibold text-[#65676B]">
                                            Bình luận
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* List comments */}
                    <div className="grid px-3 py-2">
                        <PostComment />
                        <PostComment />
                    </div>
                </div>
                <div className=" rounded-b-[10px] h-[120px] text-center border-t flex boder-t-[#ababab] absolute bg-white left-0 right-0 bottom-0 py-2">
                    <div className="w-[10%] flex justify-center">
                        <img
                            className="w-9 h-9 rounded-[50%]"
                            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=dst-jpg_p120x120&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYAvNlSlTsqJZn-csYFA6NFE8ahRD9jX5Rfd7f22UhH_dg&oe=664A6F2B"
                            alt=""
                        />
                    </div>
                    <div className=" overflow-hidden  h-fit  pr-3 w-[90%] ">
                        <div className="py-3  bg-[#f0f2f5] rounded-[10px]">
                            <TextareaAutosize
                                value={comment}
                                className="w-full bg-transparent px-3 py-1 outline-none resize-none text-[14px]"
                                maxRows={5}
                                placeholder="Bình luận vơi vai trò Hoàng Xuân Việt"
                                onChange={onChangeComment}
                                onKeyDown={onKeyDownPostComments}
                            />
                            <div className="flex items-center justify-between px-3">
                                <div className="flex ">
                                    <i className=" cursor-pointer text-[#65676B] text-[18px] mr-2">
                                        <MdOutlineEmojiEmotions />
                                    </i>
                                    <i className="cursor-pointer text-[#65676B] text-[18px] mr-2">
                                        <IoCameraOutline />
                                    </i>
                                </div>
                                <div className="flex">
                                    <div className="mr-2">{commentLength}/500</div>
                                    <div className="flex-center cursor-pointer w-7 h-7 rounded-[50%] hover:bg-[#ddddde] hover:text-red-500">
                                        <BsFillSendFill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
