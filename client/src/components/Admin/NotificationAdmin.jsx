import React, { useEffect } from 'react';
import Menu from './Menu';
import { useGetAllNotifiMutation } from '../../Redux/features/notification/notifiAPI';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import moment from 'moment';

const NotificationAdmin = () => {
    const [getNotifi, { data: notifiData }] = useGetAllNotifiMutation();
    const [getUser, { data: userData }] = useGetUserMutation();

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
        const fetchData = async () => {
            try {
                await getNotifi(userData?._id).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getNotifi, userData]);

    return (
        <div className="flex h-screen">
            <Menu activeComponent={'notification'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Thông báo</h1>
                </div>
                <div className="p-4 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl w-full p-4 shadow-sm h-[500px] overflow-y-scroll">
                        {notifiData?.length > 0
                            ? notifiData?.map((item, index) => (
                                  <div className="flex items-center hover:bg-gray-300 p-2 px-3 rounded-md">
                                      <div>
                                          <img src="" alt="" />
                                      </div>
                                      <div className="flex flex-col">
                                          <p dangerouslySetInnerHTML={{ __html: item.content.text }} />
                                          <p className="text-sm text-gray-500">{moment(item?.createAt).fromNow()}</p>
                                      </div>
                                  </div>
                              ))
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationAdmin;
