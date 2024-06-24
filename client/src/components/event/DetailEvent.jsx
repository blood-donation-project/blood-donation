import React, { useEffect, useState } from 'react';
import NavMenu from '../NavMenu';
import BlurBackgroundImage from '../BlurBackgroundImage';
import { IoIosCheckmarkCircleOutline, IoMdMail, IoIosArrowUp } from 'react-icons/io';
import { HiOutlinePencilSquare, HiUsers, HiOutlineXMark } from 'react-icons/hi2';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';
import { FaUser } from 'react-icons/fa';
import { FaLocationDot, FaRegMessage } from 'react-icons/fa6';
import { IoTimeSharp } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    useCancelJoinMutation,
    useCheckRegisEventMutation,
    useDeleteEventMutation,
    useGetEventByIdEventQuery,
    useInviteFriendsMutation,
    useJoinEventMutation,
} from '../../Redux/features/events/eventAPI';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import UpdateEvent from './UpdateEvent';
import { useGetUserRegisterMutation } from '../../Redux/features/events/eventAPI';
import DetailJoiner from './DetailJoiner';
import { toast } from 'react-toastify';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';
import InviteFriends from './InviteFriends';
import { useGetInviteEventNotifiMutation } from '../../Redux/features/notification/notifiAPI';
import { useGetAllFriendsMutation } from '../../Redux/features/friend/friendAPI';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import moment from 'moment';
const DetailEvent = () => {
    const [tokenRefreshed, setTokenRefreshed] = useState(false); // State để theo dõi việc làm mới token
    useAutoRefreshToken('/home/', setTokenRefreshed); // Truyền setTokenRefreshed vào useAutoRefreshToken

    const [inviteFriend] = useInviteFriendsMutation();
    const [getNotification] = useGetInviteEventNotifiMutation();
    const [localNotificationData, setLocalNotificationData] = useState([]);
    const [getAllFriends, { data: friends }] = useGetAllFriendsMutation();
    const [showMore, setShowMore] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [openConfirmDel, setOpenConfirmDel] = useState(false);
    const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isCheckJoin, setIsCheckJoin] = useState(false);
    const [getUser, { data: userData }] = useGetUserMutation();
    const [checkRegisterEvent, { data: userRegisted }] = useCheckRegisEventMutation();
    const [getUserRegister, { data: userRegister }] = useGetUserRegisterMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const [cancelJoin] = useCancelJoinMutation();
    const { data, error } = useGetEventByIdEventQuery(params.id);
    const day = data?.donationTime ? dayjs(data.donationTime, 'YYYY/MM/DD').date() : 'N/A';
    // Open Popup
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isOpenDetail, setOpenDetail] = useState(false);
    const [isOpenInvite, setOpenInvite] = useState(false);
    const [joinEvent] = useJoinEventMutation();

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const fetchUser = async () => {
                try {
                    await getUser().unwrap();
                } catch (error) {}
            };
            fetchUser();
        }
    }, [getUser, tokenRefreshed]);

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const fetchData = async () => {
                try {
                    await getAllFriends({ userId: userData?._id, limit: 10 }).unwrap();

                    const notifications = await getNotification({
                        type: `InviteEvent_${params.id}_${userData?._id}`,
                    }).unwrap();
                    setLocalNotificationData(notifications);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [getAllFriends, getNotification, userData?._id, params.id, tokenRefreshed]);

    const handleInviteFriend = async (friendId) => {
        try {
            const eventId = params.id;
            await inviteFriend({ friendId, eventId }).unwrap();
            setLocalNotificationData((prevData) => [
                ...prevData,
                {
                    userId: friendId,
                    type: `InviteEvent_${eventId}_${userData._id}`,
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const isFriendInvited = (friendId) => {
        return localNotificationData.some((notification) => {
            const [prefix, notifEventId, notifUserId] = notification.type.split('_');
            return (
                prefix === 'InviteEvent' &&
                notifEventId === params.id &&
                notifUserId === userData._id &&
                notification.userId === friendId
            );
        });
    };

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const fetchData = async () => {
                try {
                    await getUserRegister(params.id).unwrap();
                } catch (error) {
                    console.error('Error fetching user registration data:', error);
                }
            };
            fetchData();
        }
    }, [getUserRegister, params.id, tokenRefreshed]);

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const fetchEventByID = async () => {
                try {
                    const result = await checkRegisterEvent(params.id).unwrap();
                    if (result) {
                        setIsCheckJoin(true);
                    } else {
                        setIsCheckJoin(false);
                    }
                } catch (error) {}
            };
            fetchEventByID();
        }
    }, [checkRegisterEvent, isCheckJoin, params.id, tokenRefreshed]);

    // Open Update
    const openPopupUpdate = () => {
        setIsUpdateOpen(true);
    };

    const closePopupUpdate = () => {
        setIsUpdateOpen(false);
    };

    useEffect(() => {
        if (error?.status === 400) {
            toast.error('Sự kiện không tồn tại!');
            navigate(-1);
        }
    }, [error?.status, navigate]);

    const showPopconfirm = () => {
        setOpenConfirmCancel(true);
    };
    const showPopconfirmDel = () => {
        setOpenConfirmDel(true);
    };
    const handleOkCanCel = async () => {
        try {
            setConfirmLoading(true);
            await cancelJoin(params.id).unwrap();
            navigate(0);
            setOpenConfirmDel(false);
            setConfirmLoading(false);
        } catch (error) {
            setOpenConfirmDel(false);
            setConfirmLoading(false);
        }
    };
    // Del Event
    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            await deleteEvent(params.id).unwrap();
            navigate(-1);
            setOpenConfirmDel(false);
            setConfirmLoading(false);
        } catch (error) {
            setOpenConfirmDel(false);
            setConfirmLoading(false);
        }
    };
    const handleCancel = () => {
        setOpenConfirmCancel(false);
    };

    const handleCancelDel = () => {
        setOpenConfirmDel(false);
    };

    const handleJoinEvent = async (e) => {
        try {
            e.preventDefault();
            await joinEvent(params.id).unwrap();
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <NavMenu />
            <div className="md:mt-[56px] xs:mt-[96px] bg-gray-100">
                {/* Header */}
                <div className="lg:max-w-6xl m-auto bg-white shadow-custom-bottom rounded-b-lg z-50">
                    <div className="relative flex justify-center">
                        <div className="relative image-container">
                            <BlurBackgroundImage className="max-w-3xl" src={data?.image} alt="" />
                        </div>
                        <div className="absolute hidden md:flex z-30 -bottom-5 left-4 w-20 h-20  flex-col rounded-2xl shadow-lg ">
                            <div className="bg-red-500 w-full rounded-t-2xl h-5"></div>
                            <div className="bg-white h-[60px] rounded-b-2xl flex items-center justify-center">
                                <h1 className="text-4xl font-semibold ">{day}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 mt-4 ml-4 flex flex-col border-b">
                        <div className="text-red-600 text-lg font-semibold">
                            NGÀY {moment(data?.donationTime).format('DD/MM/YYYY')} LÚC {data?.startTime}
                        </div>
                        <div className="text-2xl font-bold">
                            <h1>{data?.eventName}</h1>
                        </div>
                        <div className="text-[#65676B]">
                            {data?.address?.ward}, {data?.address?.district}, {data?.address?.province}
                        </div>
                    </div>
                    <div className="flex gap-1 items-center justify-center ssm:justify-end h-16 ">
                        <div className={`${userData?.role === 'Cơ sở y tế' ? 'hidden' : ''} p-1`}>
                            {isCheckJoin ? (
                                <Popconfirm
                                    title={'Hủy tham gia sự kiện'}
                                    description={'Bạn có chắc chắn muốn hủy tham gia sự kiện này không?'}
                                    open={openConfirmCancel}
                                    onConfirm={handleOkCanCel}
                                    okButtonProps={{ loading: confirmLoading }}
                                    onCancel={handleCancel}
                                >
                                    <button
                                        onClick={showPopconfirm}
                                        className="px-3 py-2 rounded-lg outline-none hover:bg-blue-200 
                                flex items-center text-blue-500 justify-between gap-2 bg-blue-100"
                                    >
                                        <IoIosCheckmarkCircleOutline className="w-6 h-6" />
                                        <p>Đã tham gia</p>
                                        <IoIosArrowUp />
                                    </button>
                                </Popconfirm>
                            ) : (
                                <button
                                    onClick={handleJoinEvent}
                                    className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center bg-gray-200"
                                >
                                    <IoIosCheckmarkCircleOutline className="w-6 h-6" />
                                    <p>Tham gia</p>
                                </button>
                            )}
                        </div>
                        <div className={`${userData?.role !== 'Cơ sở y tế' ? '' : 'hidden'} p-1`}>
                            <button
                                onClick={() => setOpenInvite(!isOpenInvite)}
                                className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center gap-2 bg-gray-200"
                            >
                                <IoMdMail className="w-6 h-6" />
                                <p>Mời</p>
                            </button>
                        </div>
                        <InviteFriends
                            isOpen={isOpenInvite}
                            onClose={() => setOpenInvite(false)}
                            currentUser={userData}
                            friends={friends}
                            notificationData={localNotificationData}
                            setNotificationData={setLocalNotificationData}
                        />
                        <div className={`${userData?.role === 'Cơ sở y tế' ? '' : 'hidden'} p-1`}>
                            <button
                                onClick={openPopupUpdate}
                                className={`${
                                    userData?._id === data?.userId ? '' : 'hidden'
                                } px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center gap-2 bg-gray-200`}
                            >
                                <HiOutlinePencilSquare className="w-6 h-6" />
                                <p>Chỉnh sửa</p>
                            </button>
                        </div>
                        {isUpdateOpen && (
                            <UpdateEvent eventData={data} isOpen={isUpdateOpen} onClose={closePopupUpdate} />
                        )}
                        <div className={`${userData?.role === 'Cơ sở y tế' ? '' : 'hidden'} p-1`}>
                            <Popconfirm
                                title={'Hủy sự kiện'}
                                description={'Bạn có chắc chắn muốn hủy sự kiện này không?'}
                                open={openConfirmDel}
                                onConfirm={handleOk}
                                okButtonProps={{ loading: confirmLoading }}
                                onCancel={handleCancelDel}
                                className={`${userData?._id === data?.userId ? '' : 'hidden'}`}
                            >
                                <button
                                    onClick={showPopconfirmDel}
                                    className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 
                                flex items-center justify-center gap-2 bg-gray-200"
                                >
                                    <HiOutlineXMark className="w-6 h-6" />
                                    <p>Hủy sự kiện</p>
                                </button>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="lg:max-w-6xl m-auto ">
                    <div className="p-4">
                        {/* Map Data */}
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-4">
                                            <div className="px-4 pb-4 pt-1">
                                                <h2 className="text-lg font-semibold">Chi tiết</h2>
                                            </div>
                                            <button className="flex outline-none px-4 pt-1 pb-2 font-thin items-center hover:bg-gray-200 w-full rounded-lg gap-2">
                                                <HiUsers className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>{userRegister?.data?.count || 0} người đã tham gia</p>
                                                </div>
                                            </button>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <FaUser className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>
                                                        Sự kiện của{' '}
                                                        <Link
                                                            to={`/user/${data?.userId}`}
                                                            className="font-bold hover:underline"
                                                        >
                                                            {data?.username}{' '}
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <FaLocationDot className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p className="font-bold">
                                                        {data?.address?.ward}, {data?.address?.district},{' '}
                                                        {data?.address?.province}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <IoTimeSharp className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>
                                                        Khoảng thời gian: {data?.startTime} - {data?.endTime}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" px-4 py-2 font-thin transition-all duration-300">
                                                <div className={`${!showMore && 'line-clamp-1'} `}>
                                                    <p>{data?.description}</p>
                                                </div>
                                                <button
                                                    onClick={() => setShowMore(!showMore)}
                                                    className="font-bold hover:underline"
                                                >
                                                    {showMore ? 'Thu gọn' : 'Xem thêm'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-4">
                                            <div className="px-4 pb-4 pt-1 flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">Người đã tham gia</h2>
                                                <button
                                                    onClick={() => setOpenDetail(!isOpenDetail)}
                                                    className="text-blue-600 text-[16px] hover:underline"
                                                >
                                                    Xem tất cả
                                                </button>
                                            </div>
                                            {isOpenDetail && (
                                                <DetailJoiner
                                                    isOpen={isOpenDetail}
                                                    onClose={() => setOpenDetail(false)}
                                                    userRegister={userRegister}
                                                    userData={userData}
                                                    userRegisted={userRegisted}
                                                    eventDataByID={data}
                                                />
                                            )}
                                            <div className="flex px-4 pt-1 pb-2 font-thin items-center justify-center gap-2 ">
                                                <button className="flex outline-none flex-col items-center rounded-lg justify-center px-10 py-2 bg-gray-100 hover:bg-gray-300">
                                                    <h1 className="text-xl font-bold">
                                                        {userRegister?.data?.count || 0}
                                                    </h1>
                                                    <h2 className="text-sm text-[#65676B]">Người tham gia</h2>
                                                </button>
                                            </div>
                                            {/* Check role */}
                                            <div className={`${userData?.role !== 'Cơ sở y tế' ? '' : 'hidden'}`}>
                                                <div className="border-b-2 border-gray-400 mt-2"></div>
                                                <div className="flex px-4 pt-4  font-thin items-center justify-between gap-2 ">
                                                    <h1 className="text-xl font-bold">Đi cùng bạn bè</h1>
                                                    <button
                                                        className="text-sm text-blue-500 hover:underline"
                                                        onClick={() => setOpenInvite(!isOpenInvite)}
                                                    >
                                                        Xem tất cả
                                                    </button>
                                                </div>

                                                {/* Map Friends */}
                                                {friends?.data?.slice(0, 3)?.map((item, index) => (
                                                    <div key={index} className="my-4">
                                                        <div className="flex px-4  font-thin items-center gap-2 hover:bg-gray-200 rounded-xl">
                                                            <div className="flex items-center w-full">
                                                                <div className="my-2 mr-3">
                                                                    <img
                                                                        className="w-9 h-9 rounded-full"
                                                                        src={item?.avatar}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="flex items-center justify-between w-full">
                                                                    <Link
                                                                        className="hover:underline"
                                                                        to={`/user/${item?._id}`}
                                                                    >
                                                                        <p>{item?.username}</p>
                                                                    </Link>
                                                                    {isFriendInvited(item._id) ? (
                                                                        <div className="p-2 flex items-center gap-1 text-blue-500 bg-blue-100 rounded-lg cursor-default border border-blue-400">
                                                                            <IoMdCheckmarkCircleOutline className="w-5 h-5" />
                                                                            Đã mời
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            className="hover:bg-gray-300 bg-gray-300 p-2 px-4 rounded-lg"
                                                                            onClick={() => handleInviteFriend(item._id)}
                                                                        >
                                                                            Mời
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-1">
                                            <div className="px-4 pb-4 pt-1">
                                                <h2 className="text-lg font-semibold">Gặp gỡ người tổ chức</h2>
                                            </div>
                                        </div>
                                        <div className="px-7">
                                            <div className="py-2">
                                                <Link>
                                                    <div className="pb-3">
                                                        <div className="    w-full">
                                                            <div className="pt-5 px-3 pb-3 flex flex-col border-2 rounded-lg border-gray-300 hover:bg-gray-100">
                                                                <div className="flex justify-center items-center ">
                                                                    <img
                                                                        className="w-40 h-40 rounded-full"
                                                                        src={data?.avatar}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="text-center p-1 font-bold">
                                                                    <h1 className="text-xl">{data?.username}</h1>
                                                                </div>
                                                                <div className="border-b my-2"></div>
                                                                <div className="text-center pb-2">
                                                                    <h1 className="text-[16px] h-11">
                                                                        {data?.introduce}
                                                                    </h1>
                                                                </div>
                                                                <Link
                                                                    to={`/message/${data?.userId}`}
                                                                    className="w-full py-2 bg-gray-300 flex items-center justify-center gap-3 hover:bg-gray-400 rounded-lg"
                                                                >
                                                                    <FaRegMessage className="w-6 h-6" />
                                                                    <h1>Nhắn ngay</h1>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEvent;
