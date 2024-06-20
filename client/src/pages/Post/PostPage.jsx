import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import Picker from 'emoji-picker-react';

import NavMenu from '../../components/NavMenu';

import PostLoading from '../../components/LoadingSkeleton/Post/PostLoading';
import PostCommentLoading from '../../components/LoadingSkeleton/Comment/PostCommentLoading';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import {
    useCreateCommentMutation,
    useGetCommentByPostIdMutation,
    useGetMoreCommentsMutation,
    useGetPostsByIdMutation,
    useLikePostMutation,
    useUnlikePostMutation,
} from '../../Redux/features/post/postAPI';
import Tippy from '@tippyjs/react';
import UserPreview from '../../components/User/UserPreview';
import Avatar from '../../components/Image/Avatar';
import calculatePostTime from '../../utils/formartTime/calculatePostTime';
import Image from '../../components/Image/Image';
import { FaRegComment, FaSpinner } from 'react-icons/fa6';
import PostComment from '../../components/Comment/PostComment';
import { BsEmojiSmileFill, BsFillSendFill } from 'react-icons/bs';

const PostPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { post, comments } = useSelector((state) => state.posts);

    const [commentContent, setCommentContent] = useState('');
    const [commentLength, setCommentLength] = useState(0);
    const [pagination, setPagination] = useState();

    const [getUser, { data: getdataUser }] = useGetUserMutation();
    const [getPostById, { isLoading: isLoadingPost }] = useGetPostsByIdMutation();
    const [getCommentByPostId, { isLoading: isLoadingComment }] = useGetCommentByPostIdMutation();
    const [getMoreComments, { isLoading: isLoadingGetMoreComments }] = useGetMoreCommentsMutation();
    const [createComment, { isLoading: isLoadingCreateComment }] = useCreateCommentMutation();
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();

    // Get User
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUser]);

    useEffect(() => {
        if (!postId || postId.length === 0) {
            window.location.href = '/404';
        }
        getPostById(postId)
            .unwrap()
            .catch(() => {
                window.location.href = '/404';
            });
    }, [postId]);

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

    const onEmojiClick = (emojiObject) => {
        setCommentContent((cmt) => cmt + emojiObject.emoji);
    };

    const togglePicker = () => {
        setPickerVisible(!isPickerVisible);
    };

    const onChangeComment = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;

        setCommentContent(value);
        setCommentLength(value.length);
    };

    const handleLikePost = () => {
        likePost(post?._id).unwrap();
    };

    const handleUnlikePost = () => {
        unlikePost(post?._id).unwrap();
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
        await createComment(commentData).unwrap();

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
        getdataUser && (
            <>
                {/* Header */}
                <NavMenu />
                {/* Body */}
                <div className="flex-center xs:mt-[96px] md:mt-[56px] bg-[#f0f2f5] ">
                    {/* Content */}
                    <div className=" xs:w-full mt-4  md:w-[700px]  bg-white md:rounded-[8px] md:shadow md:shadow-[rgba(0,0,0,0.5)]  relative">
                        {!isLoadingPost ? (
                            <div className=" overflow-y-auto w-full h-full md:rounded-[8px]">
                                {/* Post detail */}
                                <div className=" mb-[120px]">
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
                                                                    <UserPreview userData={post?.author} />
                                                                </div>
                                                            )}
                                                        >
                                                            <Link to={'/'}>
                                                                <Avatar
                                                                    className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                                    src={post?.author?.avatar}
                                                                    alt="avatar"
                                                                />
                                                            </Link>
                                                        </Tippy>
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-[16px] font-semibold leading-[14px]">
                                                            {post?.author?.username}
                                                        </p>
                                                        <span className="text-[12px] text-[#65676B]">
                                                            {calculatePostTime(post?.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Mô tả bài đăng */}
                                                <div className="">
                                                    <span className="text-[16px]">{post?.content}</span>
                                                </div>
                                            </div>
                                            {/* Hình ảnh/Video nếu có */}
                                            {post?.image && (
                                                <div className="bg-[#b2aea6] flex-center cursor-pointer">
                                                    <Image
                                                        className=" max-w-full max-h-[660px]"
                                                        src={post?.image}
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                            {/* Bình luận/cảm xúc */}
                                            <div className="px-2 py-1">
                                                <div className="flex py-1 justify-between border-b border-b-[#ccc]">
                                                    <span className="text-[16px] text-[#65676B]">
                                                        {' '}
                                                        {post?.likeCount > 0 && `${post?.likeCount} lượt thích`}
                                                    </span>
                                                    <span className="text-[16px] text-[#65676B] cursor-pointer hover:underline">
                                                        {post?.commentCount > 0 && `${post?.commentCount} bình luận`}{' '}
                                                    </span>
                                                </div>
                                                <div className="flex pt-1">
                                                    {post?.liked ? (
                                                        <div
                                                            className=" text-[#386fd6] cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]  "
                                                            onClick={handleUnlikePost}
                                                        >
                                                            <AiFillLike />
                                                            <span className=" text-[15px]  ml-1 font-semibold ">
                                                                Thích
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="text-[#65676B] cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]"
                                                            onClick={handleLikePost}
                                                        >
                                                            <AiOutlineLike />
                                                            <span className=" text-[15px]  ml-1 font-semibold ">
                                                                Thích
                                                            </span>
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
                                            {isLoadingComment ? (
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
                                        <Avatar className="w-9 h-9 rounded-[50%]" src={getdataUser?.avatar} alt="" />
                                    </div>
                                    <div className="  h-full  pr-3 w-[90%] ">
                                        <div className="py-3 max-h-full  bg-[#f0f2f5] rounded-[10px]">
                                            <div className="h-[60px] overflow-y-scroll">
                                                <TextareaAutosize
                                                    value={commentContent}
                                                    className="w-full bg-transparent px-3 py-1 outline-none resize-none text-[16px]"
                                                    placeholder={`Bình luận với vai trò ${getdataUser?.username}`}
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
                        ) : (
                            <PostLoading />
                        )}
                    </div>
                </div>
            </>
        )
    );
};

export default PostPage;
