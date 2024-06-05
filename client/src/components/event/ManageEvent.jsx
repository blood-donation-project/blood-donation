import React, { useEffect, useState } from 'react';
import schedule from '../../assets/img/schedule.png';
import { IoCreateOutline } from 'react-icons/io5';
import CreateEvent from './CreateEvent';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { GrSearch } from 'react-icons/gr';
import { FaUser, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useVerifyToken } from '../../hooks/useAutoRefreshToken';
import Datepicker from 'react-tailwindcss-datepicker';
import NavMenu from '../NavMenu';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import { Link } from 'react-router-dom';
import { useGetEventByIdMutation } from '../../Redux/features/events/eventAPI';
import OrganizeEvent from './yourEvent/OrganizeEvent';
import SearchOrganizeEvent from './yourEvent/SearchOrganizeEvent';
const ManageEvent = () => {
    useVerifyToken('/events/manage-events');
    const [getUser, { data: userData }] = useGetUserMutation();
    const [getEventById, { data: eventDataById }] = useGetEventByIdMutation();
    const [isSearch, setIsSearch] = useState(false);
    const [optionComponent, setOptionComponent] = useState('join');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMyEventOpen, setIsMyEventOpen] = useState(false);
    const [dateValue, setDateValue] = useState({
        startDate: null,
        endDate: null,
    });
    const [eventName, setEventName] = useState('');

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Data From OrganizeEvent To ManageEvent

    // GET USER
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getUser().unwrap();
                result?.role === 'Medical facility'
                    ? setOptionComponent('organize')
                    : setOptionComponent('join');
            } catch (error) {}
        };
        fetchData();
    }, [getUser]);

    //GET EVENT BY ID

    // SEARCH EVENT

    const handleDateValueChange = (newValue) => {
        setDateValue(newValue);
    };
    // Handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchParams = {
            eventName,
            startDate: dateValue.startDate,
            endDate: dateValue.endDate,
        };
        await getEventById(searchParams).unwrap();
        setIsSearch(true);
    };

    return (
        <>
            <NavMenu />
            <div className="mt-[65px]">
                <div className="md:flex">
                    {/* SideBar */}
                    <div className="hidden lg:block lg:w-[360px] ">
                        <div className="fixed h-[calc(h-screen_-_56px)] left-0 top-[56px]  shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 w-[360px]">
                            <div className="py-1">
                                <h2 className="text-2xl font-semibold">
                                    Sự kiện của bạn
                                </h2>
                            </div>

                            <div className="mt-4">
                                <Link
                                    to={'/events'}
                                    className={` flex cursor-pointer items-center rounded-xl hover:bg-gray-100 px-2 h-14 gap-3 my-1`}
                                >
                                    <div
                                        className={` w-11 h-11 active:bg-blue-500 active:text-white bg-gray-300  rounded-full flex justify-center items-center transition-all duration-300`}
                                    >
                                        <FaHouseChimney className="w-6 h-6 flex justify-center items-center" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg">Trang chủ</h2>
                                    </div>
                                </Link>
                                <form
                                    onSubmit={handleSubmit}
                                    className=""
                                >
                                    {/* Filter Event */}
                                    <div
                                        className={` w-full  rounded-lg transition-all duration-200 my-1`}
                                    >
                                        <div
                                            onClick={() =>
                                                setIsFilterOpen(!isFilterOpen)
                                            }
                                            className={` ${
                                                isFilterOpen
                                                    ? 'bg-gray-100'
                                                    : ''
                                            } flex cursor-pointer items-center rounded-xl hover:bg-gray-100 px-2 h-14 gap-3`}
                                        >
                                            <div
                                                className={` w-11 h-11 ${
                                                    isFilterOpen
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-300'
                                                }   rounded-full flex justify-center items-center transition-all duration-300`}
                                            >
                                                <GrSearch className="w-6 h-6 flex justify-center items-center" />
                                            </div>
                                            <div className=" flex flex-1 justify-between items-center">
                                                <h2 className="text-lg">
                                                    Tìm kiếm
                                                </h2>
                                                {isFilterOpen ? (
                                                    <PiCaretUpBold />
                                                ) : (
                                                    <PiCaretDownBold />
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`${
                                                isFilterOpen
                                                    ? 'block'
                                                    : 'hidden'
                                            } p-2`}
                                        >
                                            <div className="pb-2">
                                                <input
                                                    value={eventName}
                                                    onChange={(e) =>
                                                        setEventName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Tìm kếm tên sự kiện"
                                                    className="w-full outline-none border border-gray-300 focus:border-blue-500 focus:ring
                                                focus:ring-blue-200 transition-all duration-300 rounded-lg p-2"
                                                    type="search"
                                                    name=""
                                                    id=""
                                                />
                                            </div>
                                            <div className="mt-1 mb-1">
                                                <Datepicker
                                                    primaryColor="blue"
                                                    displayFormat="DD/MM/YYYY"
                                                    separator="-"
                                                    showShortcuts={true}
                                                    value={dateValue}
                                                    inputClassName={
                                                        ' outline-none p-2 py-3 w-full border border-gray-300 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg'
                                                    }
                                                    onChange={
                                                        handleDateValueChange
                                                    }
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={handleSubmit}
                                                    className="my-5 outline-none hover:bg-[#1c5291] bg-[#386fd6] text-white py-4 px-10 text-lg rounded-lg"
                                                    type="submit"
                                                >
                                                    Tìm Kiếm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div
                                    onClick={() =>
                                        setIsMyEventOpen(!isMyEventOpen)
                                    }
                                    className={` ${
                                        isMyEventOpen ? 'bg-gray-100' : ''
                                    } flex cursor-pointer items-center rounded-xl hover:bg-gray-100 px-2 h-14 my-1 gap-3`}
                                >
                                    <div
                                        className={` w-11 h-11 ${
                                            isMyEventOpen
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-300'
                                        }   rounded-full flex justify-center items-center transition-all duration-300`}
                                    >
                                        <FaUser className="w-6 h-6 flex justify-center items-center" />
                                    </div>
                                    <div className=" flex flex-1 justify-between items-center">
                                        <h2 className="text-lg">
                                            Sự kiện của bạn
                                        </h2>
                                        {isMyEventOpen ? (
                                            <PiCaretUpBold />
                                        ) : (
                                            <PiCaretDownBold />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        isMyEventOpen ? 'block' : 'hidden'
                                    } pl-4 py-2 transition-all duration-200`}
                                >
                                    <div
                                        onClick={(e) => {
                                            setOptionComponent('organize');
                                            setIsSearch(false);
                                        }}
                                        className={` ${
                                            optionComponent === 'organize'
                                                ? 'bg-gray-100'
                                                : ''
                                        } cursor-pointer flex h-14  rounded-xl gap-3 items-center hover:bg-gray-100 pl-2`}
                                    >
                                        <div
                                            className={`w-11 h-11 ${
                                                optionComponent ===
                                                    'organize' ||
                                                optionComponent === 'join'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-300'
                                            }  flex justify-center items-center rounded-full`}
                                        >
                                            {userData?.role ===
                                            'Medical facility' ? (
                                                <FaCalendarAlt className="w-6 h-6" />
                                            ) : (
                                                <FaCheckCircle className="w-6 h-6" />
                                            )}
                                        </div>
                                        <h2>
                                            {userData?.role ===
                                            'Medical facility'
                                                ? 'Tổ chức'
                                                : 'Sẽ tham gia'}
                                        </h2>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setOptionComponent('passed');
                                            setIsSearch(false);
                                        }}
                                        className={` ${
                                            optionComponent === 'passed'
                                                ? 'bg-gray-100'
                                                : ''
                                        } cursor-pointer flex h-14  rounded-xl gap-3 items-center hover:bg-gray-100 pl-2`}
                                    >
                                        <div
                                            className={`w-11 h-11 ${
                                                optionComponent === 'passed'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-300'
                                            }  flex justify-center items-center rounded-full`}
                                        >
                                            <BsArrowCounterclockwise className="w-6 h-6" />
                                        </div>
                                        <h2>Sự kiện đã qua</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="h-full lg:w-[calc(100%_-_360px)]">
                        {userData?.role === 'Medical facility' ? (
                            <div className=" flex justify-end">
                                <button
                                    onClick={handleOpenPopup}
                                    className="bg-[#28a745] mr-1 hover:bg-[#218838] outline-none 
                transition-colors flex items-center gap-1 justify-center duration-200 rounded-lg p-4 text-white"
                                >
                                    <IoCreateOutline className="w-6 h-6" />
                                    Thêm sự kiện mới
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                        <div>
                            <CreateEvent
                                isOpen={isPopupOpen}
                                onClose={handleClosePopup}
                            />
                        </div>
                        {isSearch ? (
                            <SearchOrganizeEvent
                                eventDataById={eventDataById}
                                title={`Sự kiện bạn đang tổ chức`}
                                tab={optionComponent}
                                role={userData?.role}
                            />
                        ) : (
                            <OrganizeEvent tab={optionComponent} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageEvent;
