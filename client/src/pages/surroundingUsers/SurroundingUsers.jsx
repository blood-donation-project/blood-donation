import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa6';
import Select from 'react-select';

import ModalWrapper from '../../components/Modal/ModalWrapper';
import UserRoundingFilter from '../../components/Modal/ModalContent/UserRoundingFilter';
import NoResult from '../../components/NoResult';
import UserDonateBlood from '../../components/User/UserDonateBlood';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import { getProvinces } from '../../services/locationServices';
import UserDonateBloodLoading from '../../components/LoadingSkeleton/User/UserDonateBloodLoading';
import { useSearchSurroundingUsersMutation } from '../../Redux/features/search/searchAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import { resetSurroundingUsersData } from '../../Redux/features/search/searchSlice';

const SurroundingUsers = () => {
    const { user } = useSelector((state) => state.user);
    const { surroundingUsersData } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [isShowingFilterModal, setIsShowingFilterModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState({
        province: user?.address?.province || 'Thành phố Hà Nội',
        bloodGroup: user?.bloodGroup || '',
    });

    const [options, setOptions] = useState({
        province: '',
        bloodGroup: [
            {
                value: '',
                label: 'Tất cả',
            },
            {
                value: 'O-',
                label: 'O-',
            },
            {
                value: 'O+',
                label: 'O+',
            },
            {
                value: 'A-',
                label: 'A-',
            },
            {
                value: 'A+',
                label: 'A+',
            },
            {
                value: 'B-',
                label: 'B-',
            },
            {
                value: 'B+',
                label: 'B+',
            },
            {
                value: 'AB+',
                label: 'AB+',
            },
            {
                value: 'AB-',
                label: 'AB-',
            },
        ],
    });

    const [searchSurroundingUsers, { isLoading }] = useSearchSurroundingUsersMutation();

    const fetchSurroundingUsers = (page) => {
        searchSurroundingUsers({
            province: selectedValue.province,
            bloodGroup: encodeURIComponent(selectedValue.bloodGroup),
            limit: 15,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        fetchSurroundingUsers();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsShowingFilterModal(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getProvinces()
            .then((res) => {
                const formatOptions = res?.data?.map((el) => {
                    return {
                        ...el,
                        value: el?.full_name,
                        label: el?.full_name,
                    };
                });
                setOptions((prev) => {
                    return {
                        ...prev,
                        province: formatOptions,
                    };
                });
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const showFilterModal = () => {
        setIsShowingFilterModal(true);
    };

    const hideFilterModal = () => {
        setIsShowingFilterModal(false);
    };

    const changeProvince = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                province: selectValue.value,
            };
        });
    };

    const changeBloodGroup = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                bloodGroup: selectValue.value,
            };
        });
    };

    const handleSearch = () => {
        dispatch(resetSurroundingUsersData());
        fetchSurroundingUsers();
    };

    return (
        <>
            <NavMenu />
            <div className="xs:pt-[96px] md:pt-[56px]">
                <div className=" w-full bg-[#ebedf0]">
                    {/* Content */}
                    <div className=" mx-auto max-w-[1150px] w-full md:px-2  min-h-screen">
                        {/* Select */}
                        <div className="pt-3 ">
                            {/* Tablet & PC */}
                            <div className="xs:hidden md:grid pt-2 px-2  grid-cols-3 gap-8  bg-white  py-4">
                                <div>
                                    {' '}
                                    <div>
                                        <h3>Thành phố/Tỉnh thành</h3>
                                    </div>
                                    <Select
                                        className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1"
                                        onChange={changeProvince}
                                        options={options.province}
                                        value={selectedValue.province || user?.address?.province}
                                        placeholder={selectedValue.province || user?.address?.province}
                                        isDisabled={options.province ? false : true}
                                    />
                                </div>

                                <div>
                                    {' '}
                                    <div>
                                        <h3>Nhóm máu</h3>
                                    </div>
                                    <Select
                                        className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1"
                                        onChange={changeBloodGroup}
                                        options={options.bloodGroup}
                                        value={selectedValue.bloodGroup || ''}
                                        placeholder={selectedValue.bloodGroup || 'Tất cả'}
                                        isDisabled={options.province ? false : true}
                                    />
                                </div>
                                <div className="flex-center">
                                    {' '}
                                    <button
                                        className="px-3 py-1 bg-[#386fd6] rounded-md hover:bg-[#1c5291] text-white"
                                        onClick={handleSearch}
                                        type="button"
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                            {/* Mobile */}
                            <div className="md:hidden p-2 bg-white flex items-center justify-between">
                                <h3 className="text-[#65656B] font-semibold text-[18px]">Người dùng gần đây</h3>
                                <div
                                    className="flex-center px-2 py-1 rounded hover:bg-[#cacaca] cursor-pointer text-[#65656B] bg-[#ebedf0]"
                                    onClick={showFilterModal}
                                >
                                    <FaFilter />
                                    <span className="ml-2">Bộ lọc</span>
                                </div>
                            </div>
                        </div>

                        {surroundingUsersData ? (
                            <InfiniteScroll
                                className="mt-3 grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
                                dataLength={surroundingUsersData.length}
                                next={() => {
                                    fetchSurroundingUsers(pagination?.currentPage + 1);
                                }}
                                hasMore={hasMore}
                                loader={<UserDonateBlood />}
                                scrollThreshold="100px"
                            >
                                {surroundingUsersData.map((helper, index) => {
                                    return <UserDonateBlood key={index} helper={helper} />;
                                })}
                            </InfiniteScroll>
                        ) : (
                            <UserDonateBloodLoading />
                        )}

                        {!isLoading && surroundingUsersData.length === 0 && <NoResult />}
                    </div>
                </div>
            </div>
            <ModalWrapper isShowing={isShowingFilterModal} hideModal={hideFilterModal}>
                <UserRoundingFilter hideModal={hideFilterModal} setPagination={setPagination} />
            </ModalWrapper>
        </>
    );
};

export default SurroundingUsers;
