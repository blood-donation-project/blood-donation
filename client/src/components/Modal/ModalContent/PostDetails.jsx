import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Tippy from '@tippyjs/react/headless';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { FaRegComment, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { IoCameraOutline } from 'react-icons/io5';
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

const PostDetails = ({ postId, hideModal }) => {
    const dispatch = useDispatch();

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

    useEffect(() => {
        getCommentByPostId({ postId, limit: 10, page: 1 })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
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
        <div className=" xs:w-full xs:h-screen z-[9] md:w-[700px] md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow md:shadow-[rgba(0,0,0,0.5)]  relative">
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
                                                    src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/441185472_859553369550576_4197182993968662181_n.png?stp=dst-png_p120x120&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4FR8PvJr70sQ7kNvgH0CKF-&_nc_ht=scontent.fhan20-1.fna&oh=00_AYC5XrkeyvJ_TzA89BxoTt2ENAlVvOu0ufQ7WRq8Uu9t_w&oe=664A21C6"
                                                    alt="avatar"
                                                />
                                            </Link>
                                        </Tippy>
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-[14px] font-semibold leading-[14px]">
                                            {postDetail.author.username}
                                        </p>
                                        <span className="text-[12px] text-[#65676B]">
                                            {calculatePostTime(postDetail.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                {/* Mô tả bài đăng */}
                                <div className="">
                                    <span className="text-[14px]">{postDetail.content}</span>
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
                                    <span className="text-[14px] text-[#65676B]">
                                        {' '}
                                        {postDetail.likeCount > 0 && `${postDetail.likeCount} lượt thích`}
                                    </span>
                                    <span className="text-[14px] text-[#65676B] cursor-pointer hover:underline">
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
                        <Avatar
                            className="w-9 h-9 rounded-[50%]"
                            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=dst-jpg_p120x120&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYAvNlSlTsqJZn-csYFA6NFE8ahRD9jX5Rfd7f22UhH_dg&oe=664A6F2B"
                            alt=""
                        />
                    </div>
                    <div className="  h-full  pr-3 w-[90%] ">
                        <div className="py-3 max-h-full  bg-[#f0f2f5] rounded-[10px]">
                            <div className="h-[60px] overflow-y-scroll">
                                <TextareaAutosize
                                    value={commentContent}
                                    className="w-full bg-transparent px-3 py-1 outline-none resize-none text-[14px]"
                                    placeholder="Bình luận với vai trò Hoàng Xuân Việt"
                                    onChange={onChangeComment}
                                    onKeyDown={onKeyDownPostComments}
                                />
                            </div>
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