import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Tippy from '@tippyjs/react/headless';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { FaRegComment, FaSpinner } from 'react-icons/fa';
import Picker from 'emoji-picker-react';

import { Link } from 'react-router-dom';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BsFillSendFill } from 'react-icons/bs';
import { FaArrowLeftLong } from 'react-icons/fa6';

import {
    useGetCommentByPostIdMutation,
    useCreateCommentMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetMoreCommentsMutation,
} from '../../../Redux/features/post/postAPI';
import Image from '../../Image/Image';
import UserPreview from '../../User/UserPreview';
import PostComment from '../../Comment/PostComment';
import calculatePostTime from '../../../utils/formartTime/calculatePostTime';
import Avatar from '../../Image/Avatar';
import PostCommentLoading from '../../LoadingSkeleton/Comment/PostCommentLoading';
import { updateOneSearchPostData } from '../../../Redux/features/search/searchSlice';
import { IoSend } from 'react-icons/io5';

import { BsEmojiSmileFill } from 'react-icons/bs';

const PostDetails = ({ postId, hideModal }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [commentContent, setCommentContent] = useState('');
    const [commentLength, setCommentLength] = useState(0);
    const [pagination, setPagination] = useState();

    const [getCommentByPostId, { isLoading }] = useGetCommentByPostIdMutation();
    const [getMoreComments, { isLoading: isLoadingGetMoreComments }] = useGetMoreCommentsMutation();
    const [createComment, { isLoading: isLoadingCreateComment }] = useCreateCommentMutation();
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();

    const { homePagePosts, profilePosts, comments } = useSelector((state) => state.posts);
    const postDetail = homePagePosts.concat(profilePosts).find((post) => post._id === postId);

    const emojiRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiRef.current &&
                !emojiRef.current.contains(event.target) &&
                !emojiButtonRef.current.contains(event.target)
            ) {
                setPickerVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiRef]);

    const onEmojiClick = (emojiObject) => {
        setCommentContent((cmt) => cmt + emojiObject.emoji);
    };

    const togglePicker = () => {
        setPickerVisible(!isPickerVisible);
    };

    useEffect(() => {
        try {
            getCommentByPostId({ postId, limit: 10, page: 1 })
                .unwrap()
                .then((res) => {
                    setPagination(res.pagination);
                });
        } catch (error) {
            console.log(error);
        }
    }, [postId]);

    const onChangeComment = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;

        setCommentContent(value);
        setCommentLength(value.length);
    };

    const handleLikePost = () => {
        likePost(postDetail._id)
            .unwrap()
            .then((res) => {
                dispatch(updateOneSearchPostData(res));
            });
    };

    const handleUnlikePost = () => {
        unlikePost(postDetail._id)
            .unwrap()
            .then((res) => {
                dispatch(updateOneSearchPostData(res));
            });
    };

    const onKeyDownPostComments = async (e) => {
        if (e.key === 'Enter') {
            handleCreateComment();
        }
    };

    const handleCreateComment = async () => {
        const commentData = {
            postId,
            content: commentContent,
        };
        await createComment(commentData)
            .unwrap()
            .then((res) => {
                dispatch(updateOneSearchPostData(res.post));
            });
        setCommentContent('');
        setCommentLength(0);
    };

    const handleGetMoreComments = async () => {
        const nextPage = pagination.currentPage + 1;
        await getMoreComments({ postId, limit: 10, page: nextPage })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    return (
        <div className="z-[999999] xs:w-full xs:h-screen  md:w-[700px] md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow md:shadow-[rgba(0,0,0,0.5)]  relative">
            <div className=" overflow-y-auto w-full h-full md:rounded-[10px]">
                {/* Header Tblet & PC */}
                <div className=" xs:hidden md:flex justify-center items-center rounded-t-[10px] h-[44px] border-b boder-b-[#ccc] absolute bg-white left-0 right-0 top-0">
                    <h3 className="font-bold text-[20px]">Bài viết của {postDetail.author.username}</h3>

                    <div
                        className="w-8 h-8 bg-[#e1e2e4] rounded-[50%] flex-center cursor-pointer absolute right-2 top-2"
                        onClick={hideModal}
                    >
                        <IoMdClose />
                    </div>
                </div>
                {/* Header mobile */}

                <div className=" md:hidden  rounded-t-[10px] h-[44px] flex-center border-b boder-b-[#ccc] absolute bg-white left-0 right-0 top-0">
                    <h3 className="font-semibold text-[18px]">Bài viết của {postDetail.author.username}</h3>

                    <div
                        className="w-[44px] h-[44px] hover:bg-[#e1e2e4]  flex-center cursor-pointer absolute left-0 top-0"
                        onClick={hideModal}
                    >
                        <FaArrowLeftLong />
                    </div>
                </div>

                {/* Post detail */}
                <div className="mt-11 mb-[120px]">
                    {/*  */}

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
                                            appendTo={document.body}
                                            render={(attrs) => (
                                                <div
                                                    className="bg-white shadow-md shadow-[rgba(0,0,0,0.5)] w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                                    tabIndex="-1"
                                                    {...attrs}
                                                >
                                                    <UserPreview userData={postDetail.author} />
                                                </div>
                                            )}
                                        >
                                            <Link to={'/'}>
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                    src={postDetail.author.avatar}
                                                    alt="avatar"
                                                />
                                            </Link>
                                        </Tippy>
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-[16px] font-semibold leading-[14px]">
                                            {postDetail.author.username}
                                        </p>
                                        <span className="text-[12px] text-[#65676B]">
                                            {calculatePostTime(postDetail.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                {/* Mô tả bài đăng */}
                                <div className="">
                                    <span className="text-[16px]">{postDetail.content}</span>
                                </div>
                            </div>
                            {/* Hình ảnh/Video nếu có */}
                            {postDetail.image && (
                                <div className="bg-[#b2aea6] flex-center cursor-pointer">
                                    <Image className=" max-w-full max-h-[660px]" src={postDetail.image} alt="" />
                                </div>
                            )}
                            {/* Bình luận/cảm xúc */}
                            <div className="px-2 py-1">
                                <div className="flex py-1 justify-between border-b border-b-[#ccc]">
                                    <span className="text-[16px] text-[#65676B]">
                                        {' '}
                                        {postDetail.likeCount > 0 && `${postDetail.likeCount} lượt thích`}
                                    </span>
                                    <span className="text-[16px] text-[#65676B] cursor-pointer hover:underline" >
                                        {postDetail.commentCount > 0 && `${postDetail.commentCount} bình luận`}{' '}
                                    </span>
                                </div>
                                <div className="flex pt-1">
                                    {postDetail.liked ? (
                                        <div
                                            className=" text-[#386fd6] cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]  "
                                            onClick={handleUnlikePost}
                                        >
                                            <AiFillLike />
                                            <span className=" text-[15px]  ml-1 font-semibold ">Thích</span>
                                        </div>
                                    ) : (
                                        <div
                                            className="text-[#65676B] cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]"
                                            onClick={handleLikePost}
                                        >
                                            <AiOutlineLike />
                                            <span className=" text-[15px]  ml-1 font-semibold ">Thích</span>
                                        </div>
                                    )}

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
                    <div className="px-3 py-2">
                        <div className="grid ">
                            {isLoading ? (
                                <PostCommentLoading />
                            ) : (
                                comments.map((comment, index) => {
                                    return <PostComment key={index} commentData={comment} />;
                                })
                            )}
                            {/* <PostComment /> */}
                        </div>
                        {pagination?.links.next && (
                            <div>
                                {isLoadingGetMoreComments ? (
                                    <div className="font-semibold flex items-center cursor-default text-[#65676B] text-[13px] ">
                                        <span>Xem thêm bình luận</span>
                                        <div className="ml-2">
                                            <div className="spinner">
                                                <FaSpinner />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="font-semibold flex cursor-pointer text-[#65676B] text-[13px] ">
                                        <span onClick={handleGetMoreComments}>Xem thêm bình luận</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* My comment */}
                <div className=" rounded-b-[10px] h-[120px] text-center border-t flex boder-t-[#ababab] absolute bg-white left-0 right-0 bottom-0 py-2">
                    <div className="w-[10%] flex justify-center">
                        <Avatar className="w-9 h-9 rounded-[50%]" src={user.avatar} alt="" />
                    </div>
                    <div className="  h-full  pr-3 w-[90%] ">
                        <div className="py-3 max-h-full  bg-[#f0f2f5] rounded-[10px]">
                            <div className="h-[60px] overflow-y-scroll">
                                <TextareaAutosize
                                    value={commentContent}
                                    className="w-full bg-transparent px-3 py-1 outline-none resize-none text-[16px]"
                                    placeholder={`Bình luận với vai trò ${user.username}`}
                                    onChange={onChangeComment}
                                    onKeyDown={onKeyDownPostComments}
                                />
                            </div>

                            <div className="flex items-center justify-between px-3">
                                <div className="flex relative">
                                    {isPickerVisible && (
                                        <div ref={emojiRef} className="  ">
                                            <Picker
                                                emojiStyle="native"
                                                className="bottom-[400px]"
                                                style={{ height: '400px' }}
                                                onEmojiClick={onEmojiClick}
                                            />
                                        </div>
                                    )}
                                    <button
                                        ref={emojiButtonRef}
                                        onClick={togglePicker}
                                        className="outline-none"
                                        type="button"
                                    >
                                        <BsEmojiSmileFill className="text-[#65676B]" />
                                    </button>
                                </div>
                                <div className="flex">
                                    <div className="mr-2">{commentLength}/500</div>
                                    {commentLength > 0 && commentLength <= 500 ? (
                                        isLoadingCreateComment ? (
                                            <div className={`flex-center  w-7 h-7 rounded-[50%] '}`}>
                                                <div className="spinner">
                                                    <FaSpinner />
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`flex-center  w-7 h-7 rounded-[50%]  text-[#386fd6] hover:bg-[#ddddde] cursor-pointer'}`}
                                                onClick={handleCreateComment}
                                            >
                                                <BsFillSendFill />
                                            </div>
                                        )
                                    ) : (
                                        <div
                                            className={`flex-center  w-7 h-7 rounded-[50%] text-[#65676B] cursor-default}`}
                                        >
                                            <BsFillSendFill />
                                        </div>
                                    )}
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
