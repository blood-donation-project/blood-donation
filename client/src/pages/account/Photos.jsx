import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import ModalWrapper from '../../components/Modal/ModalWrapper';
import ViewPhoto from '../../components/Modal/ModalContent/ViewPhoto';
import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import { useGetPhotosMutation } from '../../Redux/features/user/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../components/Image/Image';
import Skeleton from 'react-loading-skeleton';
import { resetPhotos } from '../../Redux/features/user/userSlice';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const PhotosPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const [image, setImage] = useState('');
    const { photos } = useSelector((state) => state.user);
    const [getPhotos, { isLoading }] = useGetPhotosMutation();

    const fetchPhotos = async (page) => {
        await getPhotos({
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
        dispatch(resetPhotos());
        if (tokenRefreshed) {
            fetchPhotos();
        }
    }, [tokenRefreshed]);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const showViewImageModal = (img) => {
        setImage(img);

        setIsShowingViewImageModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageModal(false);
    };

    return (
        <>
            <NavMenu />

            <div className="bg-gray-200 pt-4 pb-10  min-h-[calc(100vh_-_636px)]">
                <div className="max-w-[1150px] mx-auto  md:px-4">
                    <div className="bg-white p-4 md:rounded-lg overflow-hidden">
                        {/*  */}
                        <div className="flex">
                            <div>
                                <h3 className="text-[18px] font-bold">Ảnh</h3>
                            </div>
                        </div>

                        {/*  */}
                        <div className="mt-4">
                            <div>
                                {/* Map photos data here */}
                                {isLoading ? (
                                    <div className="xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 rounded-[8px] overflow-hidden grid   gap-1">
                                        {new Array(9).fill(0).map((_, i) => {
                                            return (
                                                <div className=" aspect-square cursor-pointer" key={i}>
                                                    <Skeleton className="w-full h-full" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <InfiniteScroll
                                        className="xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 rounded-[8px] overflow-hidden grid   gap-1"
                                        dataLength={photos.length}
                                        next={() => {
                                            fetchPhotos(pagination?.currentPage + 1);
                                        }}
                                        hasMore={hasMore}
                                        loader={new Array(9).fill(0).map((img, i) => {
                                            return (
                                                <div className=" aspect-square cursor-pointer" key={i}>
                                                    <Skeleton className="w-full h-full" />
                                                </div>
                                            );
                                        })}
                                        scrollThreshold="100px"
                                    >
                                        {photos.map((img, i) => {
                                            return (
                                                <div
                                                    className=" aspect-square cursor-pointer"
                                                    key={i}
                                                    onClick={() => {
                                                        showViewImageModal(img);
                                                    }}
                                                >
                                                    <Image className=" object-cover w-full h-full" src={img} alt="" />
                                                </div>
                                            );
                                        })}
                                    </InfiniteScroll>
                                )}
                                {!isLoading && photos.length === 0 && (
                                    <div className="flex-center">
                                        <span className="text-[#65676B] font-medium">
                                            Hiện chưa có ảnh nào được đăng tải
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

export default PhotosPage;
