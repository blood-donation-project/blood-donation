import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetReceiverMutation } from '../../../Redux/features/message/messageAPI';
import { useGetUserMutation } from '../../../Redux/features/user/userAPI';
import { Skeleton } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import {
    onNewMessage,
    offNewMessage,
    register,
    onUpdateUserStatus,
    offUpdateUserStatus,
} from '../../../services/socket';

const Contacts = () => {
    const [
        getReceiver,
        { data: receiverMessage, isLoading: isReceiverLoading },
    ] = useGetReceiverMutation();
    const [getUser, { data: userData }] = useGetUserMutation();
    const messages = useSelector((state) => state.message.messages);
    const latestMessage = messages?.[messages?.length - 1];
    const [currentTime, setCurrentTime] = useState(moment());
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    moment.locale('vi');
    console.log(messages);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getReceiver().unwrap();
                setConversations(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getReceiver, dispatch]);

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
        const intervalId = setInterval(() => {
            setCurrentTime(moment());
        }, 60000); // Cập nhật mỗi phút

        return () => clearInterval(intervalId);
    }, []);

    // Hàm callback để xử lý sự kiện newMessage
    const handleNewMessage = useCallback((latestConversations) => {
        setConversations(latestConversations);
    }, []);

    const handleUpdateUserStatus = useCallback((onlineUsers) => {
        setOnlineUsers(onlineUsers);
    }, []);

    useEffect(() => {
        // Đăng ký người dùng với socket khi component được tải
        if (userData?._id) {
            register(userData._id);
        }

        // Lắng nghe sự kiện newMessage để cập nhật danh sách hội thoại
        onNewMessage(handleNewMessage);

        onUpdateUserStatus(handleUpdateUserStatus);

        // Cleanup khi component unmount hoặc khi userData?._id thay đổi
        return () => {
            offNewMessage(handleNewMessage);
            offUpdateUserStatus(handleUpdateUserStatus);
        };
    }, [userData?._id, handleNewMessage, handleUpdateUserStatus, params.id]);
    return (
        <div className="contacts p-2 flex-1 transition-all duration-300 overflow-y-scroll h-[70vh] cursor-default">
            <Skeleton
                loading={isReceiverLoading}
                active
            >
                {conversations?.length > 0
                    ? conversations?.map((conversation, index) => (
                          <Link
                              key={conversation?.latestMessage?._id}
                              to={`/message/${conversation?.user?._id}`}
                              className={`flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative ${
                                  conversation?.user?._id === params.id
                                      ? 'bg-blue-50 hover:bg-blue-50'
                                      : ''
                              }`}
                          >
                              <div className="w-16 h-16 relative flex flex-shrink-0">
                                  <img
                                      className="shadow-md rounded-full w-full h-full object-cover"
                                      src={conversation?.user?.avatar}
                                      alt=""
                                  />
                              </div>
                              <div className="flex-auto text-lg min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                                  <p>{conversation?.user?.username}</p>
                                  <div className="flex items-center text-sm text-gray-600">
                                      <div className="min-w-0 w-full flex gap-1 items-center">
                                          <p className="truncate text-sm">
                                              {userData?._id ===
                                              conversation?.latestMessage
                                                  ?.senderId
                                                  ? 'Bạn: '
                                                  : ''}
                                              {
                                                  conversation?.latestMessage
                                                      ?.content
                                              }
                                          </p>
                                          <span className=""> · </span>
                                          <p className="text-xs text-gray-500 flex  justify-center">
                                              {conversation?.latestMessage
                                                  ?.createAt
                                                  ? moment(
                                                        conversation
                                                            ?.latestMessage
                                                            ?.createAt
                                                    ).fromNow(currentTime)
                                                  : ''}{' '}
                                              trước
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      ))
                    : ''}
            </Skeleton>
        </div>
    );
};

export default Contacts;
