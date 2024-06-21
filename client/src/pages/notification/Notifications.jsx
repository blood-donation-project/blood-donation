import { useEffect, useState } from 'react';
import NavMenu from '../../components/NavMenu';
import { useGetAllNotifiMutation } from '../../Redux/features/notification/notifiAPI';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Image/Avatar';

const Notification = () => {
    const [getNotification, { isLoading: isLoadingNotifi, data: notifiData }] = useGetAllNotifiMutation();
    const [getUser, { data: userData }] = useGetUserMutation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await getUser().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, [getUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifications = await getNotification(userData?._id).unwrap();
                console.log('Notifications:', notifications); // Log dữ liệu để kiểm tra
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getNotification, userData?._id]);

    return (
        <>
            <NavMenu />
            <div className="flex justify-center xs:mt-[96px] md:mt-[50px] py-3 min-h-screen bg-[#f0f2f5]">
                {/* Content */}
                <div className="xs:w-full h-fit md:w-[680px] md:px-4 bg-white shadow-md md:rounded-[10px]">
                    <div className="">
                        <div className="p-2">
                            <h1 className="text-[22px] font-bold">Thông báo</h1>

                            {/* Map dữ liệu thông báo từ api */}
                            {notifiData?.map((item, index) => (
                                <div key={index} className="grid pt-6">
                                    <Link
                                        to={item?.content?.link && item?.content?.link}
                                        className="flex hover:cursor-pointer hover:bg-[#ebedf0] px-2 py-2 rounded"
                                    >
                                        {item?.content?.image && (
                                            <div>
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src={item?.content?.image}
                                                    alt="avatar"
                                                />
                                            </div>
                                        )}
                                        <div className="ml-2">
                                            <div
                                                className="text-[14px] leading-[14px] hover:bg-slate-200 p-1"
                                                dangerouslySetInnerHTML={{ __html: item.content.text }}
                                            />

                                            <span className="text-[12px]">{moment(item.createAt).fromNow()}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {!isLoadingNotifi && notifiData?.length === 0 && (
                                <div className="py-3 flex-center">
                                    <span className="text-[#65676B] font-medium">Hiện chưa có thông báo nào</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
