import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';

import { useDeletePostMutation } from '../../Redux/features/post/postAPI';
import Image from '../Image/Image';
import UserPreview from '../User/UserPreview';
import Avatar from '../Image/Avatar';
import calculatePostTime from '../../utils/formartTime/calculatePostTime';

// Data
const PostPendingApproval = ({ postData }) => {
    const { user } = useSelector((state) => state.user);
    const [isShowingPostOptions, setIsShowingPostOptions] = useState(false);
    const [deletePost] = useDeletePostMutation();

    const showPostOptions = () => {
        setIsShowingPostOptions(true);
    };

    const hidePostOptions = () => {
        setIsShowingPostOptions(false);
    };

    const handleDeletePost = () => {
        deletePost({ postId: postData._id })
            .unwrap()
            .then(() => {
                hidePostOptions();
            });
    };

    return (
        <div className=" bg-white md:rounded-[8px] shadow mb-3  ">
            <div className="px-2 py-3 ">
                {/* Author information*/}
                <div className="flex relative ">
                    <div>
                        <Tippy
                            interactive={true}
                            placement="bottom-start"
                            delay={[400, 0]}
                            appendTo={document.body}
                            render={(attrs) => (
                                <div
                                    className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <UserPreview userData={postData.author} />
                                </div>
                            )}
                        >
                            <Link to={`/user/${postData.author._id}`}>
                                <Avatar
                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                    src={postData.author.avatar}
                                    alt="avatar"
                                />
                            </Link>
                        </Tippy>
                    </div>
                    <div className="ml-2 flex flex-col">
                        <Link
                            className="text-[16px] font-semibold leading-[14px] hover:underline"
                            to={`/user/${postData.author._id}`}
                        >
                            {postData.author.username}
                        </Link>
                        <span className="text-[12px] text-[#65676B]">{calculatePostTime(postData.createdAt)}</span>
                    </div>
                    {user._id === postData.author._id && (
                        <div className="absolute right-3 top-0">
                            <Tippy
                                interactive={true}
                                visible={isShowingPostOptions}
                                onClickOutside={hidePostOptions}
                                placement="bottom-end"
                                delay={[400, 0]}
                                appendTo={document.body}
                                render={(attrs) => (
                                    <div
                                        className="bg-white  shadow shadow-[rgba(0,0,0,0.5)] w-[200px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <div
                                            className="w-full py-1 px-2 flex items-center text-[15px] cursor-pointer hover:bg-[#d2d2d2]"
                                            onClick={handleDeletePost}
                                        >
                                            <FaTrashAlt />
                                            <span className="ml-2">Xóa bài viết</span>
                                        </div>
                                    </div>
                                )}
                            >
                                <div
                                    className={`w-6 h-6 cursor-pointer rounded-[50%] flex-center hover:bg-[#ebedf0] ${isShowingPostOptions && 'bg-[#ebedf0]'}`}
                                    onClick={showPostOptions}
                                >
                                    <BsThreeDots />
                                </div>
                            </Tippy>
                        </div>
                    )}
                </div>
                {/*Post description */}
                <div className="">
                    <span className="text-[16px]">{postData.content}</span>
                </div>
            </div>

            {/* Image/video */}
            {postData.image && (
                <div className="bg-[#b2aea6] flex-center cursor-pointer">
                    <Image className=" max-w-full max-h-[660px]" src={postData.image} alt="" />
                </div>
            )}
        </div>
    );
};

export default PostPendingApproval;
