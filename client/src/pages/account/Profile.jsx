import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { resetProfilePosts } from '../../Redux/features/post/postSlice';
import { useGetPostsByUserIdMutation } from '../../Redux/features/post/postAPI';
import { useGetAllFriendsMutation } from '../../Redux/features/friend/friendAPI';
import { useGetPhotosMutation } from '../../Redux/features/user/userAPI';
import { resetPhotos } from '../../Redux/features/user/userSlice';
import { resetFriends } from '../../Redux/features/friend/friendSlice';
import Skeleton from 'react-loading-skeleton';
import UserFriendProfile from '../../components/User/UserFriendProfile';
import getLastName from '../../utils/getLastName';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GoPlusCircle } from 'react-icons/go';

const ProfilePage = () => {
    const divRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, otherUser, photos } = useSelector((state) => state.user);

    const [isShowingCreatePostModal, setIsShowingCreatePostModal] = useState(false);
    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);

    const [divHeight, setDivHeight] = useState(0);
    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [image, setImage] = useState('');

    const { profilePosts } = useSelector((state) => state.posts);
    const { friends } = useSelector((state) => state.friend);

    const [getPostsByUserId, { isLoading: isLoadingPosts }] = useGetPostsByUserIdMutation();
    const [getAllFriends, { isLoading: isLoadingFriends }] = useGetAllFriendsMutation();
    const [getPhotos, { isLoading: isLoadingPhotos }] = useGetPhotosMutation();

    const fetchProfilePosts = async (page) => {
        await getPostsByUserId({
            userId: id,
            limit: 15,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        dispatch(resetProfilePosts());
        dispatch(resetPhotos());
        dispatch(resetFriends());

        fetchProfilePosts();
        getAllFriends({ userId: id, limit: 9, page: 1 }).unwrap();
        getPhotos({ userId: id, limit: 9, page: 1 }).unwrap();
    }, []);

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const showCreatePostModal = () => {
        setIsShowingCreatePostModal(true);
    };

    const hideCreatePostModal = () => {
        setIsShowingCreatePostModal(false);
    };

    const showViewImageModal = (img) => {
        setImage(img);
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
                {otherUser && (
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
                                                className="text-[#386fd6] hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                                to={`/user/${otherUser._id}/photos`}
                                            >
                                                Xem tất cả ảnh
                                            </Link>
                                        </div>
                                        {/* Map photo data here */}
                                        <div className="rounded-[8px] overflow-hidden grid grid-cols-3  gap-1">
                                            {isLoadingPhotos ? (
                                                <div
                                                    className=" aspect-square cursor-pointer"
                                                    onClick={showViewImageModal}
                                                >
                                                    <Skeleton className="w-full h-full" />
                                                </div>
                                            ) : (
                                                photos.map((photo, index) => {
                                                    return (
                                                        <div
                                                            className=" aspect-square cursor-pointer"
                                                            onClick={() => {
                                                                showViewImageModal(photo);
                                                            }}
                                                            key={index}
                                                        >
                                                            <Avatar
                                                                className=" object-cover w-full h-full"
                                                                src={photo}
                                                                alt=""
                                                            />
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>

                                    {/* List Friends */}
                                    <div className="bg-white  px-4 py-2 md:rounded-lg mb-3">
                                        <div className="flex justify-between py-1.5">
                                            {otherUser.role === 'Cơ sở y tế' ? (
                                                <h3 className="font-bold">Người theo dõi</h3>
                                            ) : (
                                                <h3 className="font-bold">Bạn bè</h3>
                                            )}
                                            <Link
                                                className="text-[#386fd6] hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                                to={`/user/${otherUser._id}/friends`}
                                            >
                                                Xem tất cả{' '}
                                                {otherUser.role === 'Cơ sở y tế' ? ' người theo dõi' : ' bạn bè'}
                                            </Link>
                                        </div>
                                        {/* Map  friends data here */}
                                        <div className="rounded-[8px] grid grid-cols-3 gap-1 ">
                                            {isLoadingFriends ? (
                                                <div className=" aspect-square cursor-pointer">
                                                    <Skeleton className="w-full h-full" />
                                                </div>
                                            ) : (
                                                friends.map((friend, index) => {
                                                    return (
                                                        <div className=" aspect-square cursor-pointer" key={index}>
                                                            <UserFriendProfile friendData={friend} />
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content right */}
                                <div className="xs:w-[100%] md:w-[60%]  md:px-4 ">
                                    {otherUser._id === user._id && (
                                        <div className="py-2 px-3  md:rounded-[8px] shadow h-fit  w-full bg-white  ">
                                            <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src={user.avatar}
                                                    alt="avatar"
                                                />
                                                <div
                                                    className="w-full ml-3 flex items-center bg-[#f0f2f5] rounded-[16px] px-3 py-1 cursor-pointer"
                                                    onClick={showCreatePostModal}
                                                >
                                                    <span className="text-[#65676B]">
                                                        {getLastName(user.username)} ơi, bạn đang nghĩ gì thế?
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex py-1">
                                                <div
                                                    className="flex-center w-[100%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5"
                                                    onClick={showCreatePostModal}
                                                >
                                                    <GoPlusCircle />
                                                    <span className="ml-1 font-semibold text-[15px] text-[#65676B]">
                                                        Tạo bài viết mới
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="h-fit  w-full mt-3">
                                        {isLoadingPosts ? (
                                            <PostLoading />
                                        ) : (
                                            <InfiniteScroll
                                                dataLength={profilePosts.length}
                                                next={() => {
                                                    fetchProfilePosts(pagination.currentPage + 1);
                                                }}
                                                hasMore={hasMore}
                                                loader={<PostLoading />}
                                                scrollThreshold="5px"
                                            >
                                                {profilePosts.map((post, index) => {
                                                    return <Post key={index} postData={post} />;
                                                })}
                                            </InfiniteScroll>
                                        )}
                                        {!isLoadingPosts && profilePosts.length === 0 && (
                                            <div className="flex-center">
                                                <span className="py-2 text-[#65676B]">
                                                    Hiện người dùng chưa đăng tải bài viết nào
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalWrapper hideModal={hideCreatePostModal} isShowing={isShowingCreatePostModal}>
                <CreatePost hideModal={hideCreatePostModal} />
            </ModalWrapper>
            <ModalWrapper
                hideModal={hideViewImageModal}
                isShowing={isShowingViewImageModal}
                bgrColor="bg-[rgba(255,255,255,0.9)]"
            >
                <ViewPhoto hideModal={hideViewImageModal} srcImage={image} />
            </ModalWrapper>
        </>
    );
};

export default ProfilePage;
