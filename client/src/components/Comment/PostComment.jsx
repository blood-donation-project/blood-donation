import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserPreview from '../User/UserPreview';
import { Link } from 'react-router-dom';
import Avatar from '../Image/Avatar';
import { FaTrashAlt } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import { useSelector } from 'react-redux';
import { reduceCommentCountPostSearchData } from '../../Redux/features/search/searchSlice';

import calculatePostTime from '../../utils/formartTime/calculatePostTime';
import { useDeleteCommentMutation } from '../../Redux/features/post/postAPI';
import { reduceCommentCountPostData } from '../../Redux/features/post/postSlice';
const PostComment = ({ commentData }) => {
    const dispatch = useDispatch();
    const { postsData } = useSelector((state) => state.search);

    const { user } = useSelector((state) => state.user);
    const [isShowingPostOptions, setIsShowingPostOptions] = useState(false);
    const [deleteComment, { isLoading }] = useDeleteCommentMutation();

    const showPostOptions = () => {
        setIsShowingPostOptions(true);
    };

    const hidePostOptions = () => {
        setIsShowingPostOptions(false);
    };
    const handleDeleteComment = () => {
        deleteComment({ commentId: commentData._id })
            .unwrap()
            .then((res) => {
                if (postsData) dispatch(reduceCommentCountPostSearchData(res));

                dispatch(reduceCommentCountPostData(res));
                hidePostOptions();
            });
    };
    return (
        <div className="pb-2 flex ">
            <div className="flex">
                <div>
                    <Tippy
                        interactive={true}
                        placement="top-start"
                        delay={[400, 0]}
                        render={(attrs) => (
                            <div
                                className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <UserPreview userData={commentData.user} />
                            </div>
                        )}
                    >
                        <Link to={`/user/${commentData.user._id}`}>
                            <Avatar
                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                src={commentData.user.avatar}
                                alt="avatar"
                            />
                        </Link>
                    </Tippy>
                </div>
                <div className="ml-2 ">
                    <div className="bg-[#f0f2f5] rounded-[10px]  p-2 ">
                        <p className="text-[14px] font-semibold leading-[14px]">{commentData.user.username}</p>
                        <p className="text-[16px]">{commentData.content}</p>
                    </div>
                    <div className="px-2">
                        <span className="text-[10px] text-[#65676B] leading-[10px]">
                            {calculatePostTime(commentData.createAt)}
                        </span>
                    </div>
                </div>
            </div>
            {user._id === commentData.user._id && (
                <div className=" ml-2 mt-2">
                    <Tippy
                        interactive={true}
                        visible={isShowingPostOptions}
                        onClickOutside={hidePostOptions}
                        placement="bottom-end"
                        delay={[400, 0]}
                        appendTo={document.body}
                        zIndex={99999999}
                        render={(attrs) => (
                            <div
                                className="bg-white  shadow shadow-[rgba(0,0,0,0.5)] w-[200px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div
                                    className="w-full py-1 px-2 flex items-center text-[15px] cursor-pointer hover:bg-[#d2d2d2]"
                                    onClick={handleDeleteComment}
                                >
                                    <FaTrashAlt />
                                    <span className="ml-2">Xóa bình luận</span>
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
    );
};

export default PostComment;
