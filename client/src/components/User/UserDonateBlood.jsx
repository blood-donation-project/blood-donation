import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { MdBloodtype } from 'react-icons/md';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';
import {
    useGetInviteEventNotifiMutation,
    useNotifiRequestHelpMutation,
} from '../../Redux/features/notification/notifiAPI';
import { useEffect, useState } from 'react';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

const UserDonateBlood = ({ className, helper }) => {
    const [sendNotiRequestHelp] = useNotifiRequestHelpMutation();
    const [getNotification] = useGetInviteEventNotifiMutation();
    const [getUser, { data: currentUser }] = useGetUserMutation();
    const [localNotificationData, setLocalNotificationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    console.log(helper);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifications = await getNotification({
                    type: `Help_${helper?._id}_${currentUser?._id}`,
                }).unwrap();
                setLocalNotificationData(notifications);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getNotification, helper?._id, currentUser?._id]);

    const isRequestHelp = () => {
        return localNotificationData.some((notification) => {
            const [prefix, notiHelper, notifUserId] = notification.type.split('_');
            return (
                prefix === 'Help' &&
                notiHelper === helper?._id &&
                notifUserId === currentUser?._id &&
                notification.userId === helper?._id
            );
        });
    };

    const sendRequestHelp = async () => {
        try {
            setIsLoading(true);
            const helperId = helper?._id;
            const result = await sendNotiRequestHelp({ helperId }).unwrap();
            setLocalNotificationData((prevData) => [
                ...prevData,
                {
                    userId: helper?._id,
                    type: `Help_${helper?._id}_${currentUser?._id}`,
                },
            ]);
            if (result?.message === 'Successfully') {
                setIsLoading(false);
                toast.success('Gửi yêu cầu thành công!');
            }
        } catch (error) {
            console.log(error);
            toast.success('Gửi yêu cầu thất bại!');
            setIsLoading(false);
        }
    };

    console.log(localNotificationData);
    console.log(isRequestHelp());
    return (
        <div className="bg-white rounded-[8px] overflow-hidden ">
            <Link className={className}>
                <Tippy
                    interactive={true}
                    placement="bottom-start"
                    delay={[400, 0]}
                    appendTo={document.body}
                    render={(attrs) => (
                        <div
                            className="bg-white shadow-md z-[99] shadow-black w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                            tabIndex="-1"
                            {...attrs}
                        >
                            <UserPreview userData={helper} />
                        </div>
                    )}
                >
                    <div className="">
                        <Avatar
                            className="object-cover w-full h-full aspect-square  overflow-hidden"
                            src={helper?.avatar}
                            alt="avatar"
                        />

                        <div className="flex flex-col justify-center p-2">
                            <h4 className="text-[15px] font-semibold">{helper?.username}</h4>
                            <div className="text-[12px] text-[#65676B] flex items-center">
                                <MdBloodtype />
                                <span className="ml-1">{helper?.bloodGroup || 'Không xác định'}</span>
                            </div>
                        </div>
                    </div>
                </Tippy>
            </Link>
            <div className="flex-center  p-1">
                {isRequestHelp() === false ? (
                    <div className="w-full">
                        <Spin spinning={isLoading}>
                            <button
                                className="px-3 py-1.5 bg-[#386fd6] rounded hover:bg-[#1c5291] text-white w-full"
                                onClick={sendRequestHelp}
                                type="button"
                            >
                                Gửi yêu cầu
                            </button>
                        </Spin>
                    </div>
                ) : (
                    <button className="px-3 py-1.5 bg-blue-100 rounded border-blue-400 text-blue-500 w-full">
                        Đã gửi yêu cầu
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserDonateBlood;
