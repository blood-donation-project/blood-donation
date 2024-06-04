import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa6';

import ModalWrapper from '../../components/Modal/ModalWrapper';
import UserRoundingFilter from '../../components/Modal/ModalContent/UserRoundingFilter';
import NoResult from '../../components/NoResult';
import UserDonateBlood from '../../components/User/UserDonateBlood';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import UserDonateBloodLoading from '../../components/LoadingSkeleton/User/UserDonateBloodLoading';

const SurroundingUsers = () => {
    const [searchParams] = useSearchParams();
    const [isShowingFilterModal, setIsShowingFilterModal] = useState(false);

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

    const showFilterModal = () => {
        setIsShowingFilterModal(true);
    };

    const hideFilterModal = () => {
        setIsShowingFilterModal(false);
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
                            <div className="xs:hidden md:grid pt-2 px-2  grid-cols-4 gap-8  bg-white  py-4">
                                <div>
                                    {' '}
                                    <div>
                                        <h3>Thành phố/Tỉnh thành</h3>
                                    </div>
                                    <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1">
                                        <option>Hà Nội</option>
                                        <option>Hồ Chí Minh</option>
                                    </select>
                                </div>
                                <div>
                                    {' '}
                                    <div>
                                        <h3>Vai trò</h3>
                                    </div>
                                    <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1">
                                        <option>Người hiến máu</option>
                                        <option>Người nhận máu</option>
                                    </select>
                                </div>
                                <div>
                                    {' '}
                                    <div>
                                        <h3>Nhóm máu</h3>
                                    </div>
                                    <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1">
                                        <option>A</option>
                                        <option>B</option>
                                    </select>
                                </div>
                                <div className="flex-center">
                                    {' '}
                                    <button
                                        className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 text-white"
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

                        <div className=" mt-3 grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ">
                            {/*Map user here  */}
                            <UserDonateBlood />
                            {/* Loading example */}
                            <UserDonateBloodLoading />

                            {/*  */}
                        </div>

                        {/* No result example */}
                        {/* <NoResult /> */}
                    </div>
                </div>
            </div>
            <ModalWrapper isShowing={isShowingFilterModal} hideModal={hideFilterModal}>
                <UserRoundingFilter hideModal={hideFilterModal} />
            </ModalWrapper>
        </>
    );
};

export default SurroundingUsers;
