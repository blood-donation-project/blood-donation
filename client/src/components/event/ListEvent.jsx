import React, { useEffect } from 'react';
import { PiUsersThreeLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useGetUserRegisterMutation } from '../../Redux/features/events/eventAPI';

const ListEvent = ({
    index,
    image,
    avatar,
    eventName,
    centerName,
    street,
    ward,
    district,
    province,
    donationTime,
    startTime,
    endTime,
    eventId,
    buttonName,
}) => {
    const [getUserRegis, { data: userRegis }] = useGetUserRegisterMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserRegis(eventId).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUserRegis, eventId]);

    console.log(userRegis);

    return (
        <div key={index} className="lg:w-[90%]  w-full flex flex-col ssm:mb-4 mb-6 md:flex-row">
            <div className="w-full md:w-1/4  flex-1 min-h-36 flex justify-center items-center bg-white">
                <img className="rounded-full w-36 h-36" src={avatar} alt="" />
            </div>
            <div className="p-[1%] w-full md:w-1/2 bg-[#f4f4f4]  ">
                <div className="flex flex-row m-1 items-start text-xl text-rose-400 font-semibold justify-start">
                    {eventName}
                </div>
                <div className="flex flex-row m-1 items-start text-lg text-[#386fd6] font-semibold justify-start">
                    {centerName}
                </div>
                <div className="flex flex-row m-1 items-start justify-start">
                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">Địa chỉ:</span>
                    <p className="ml-1">{`${street}, ${ward}, ${district}, ${province} `}</p>
                </div>
                <div className="flex flex-row m-1 items-start justify-start">
                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">
                        Thời gian hoạt động:
                    </span>
                    <p className="ml-1">{`${donationTime}`}</p>
                </div>
                <div className="flex flex-row m-1 items-start justify-start">
                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">
                        Thời gian hiến máu:
                    </span>
                    <p className="ml-1">
                        Từ {startTime} - {endTime}
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/4 p-[1%] bg-[#f4f4f4] md:flex items-center justify-end">
                <div className="flex flex-row md:flex-col h-full md:items-center justify-between md:justify-evenly">
                    <div className="">
                        <div className="flex flex-row items-center  text-[#7a7a7a]">
                            <PiUsersThreeLight className="w-6 h-6" />
                            <span className="text-sm ml-1 flex-1">Số lượng tham gia</span>
                        </div>
                        {/* Map */}
                        <h5 className="text-2xl text-[#386fd6] font-medium">
                            {userRegis?.data?.count || 0} <span className="text-sm font-normal"> Người </span>
                        </h5>
                    </div>
                    <div>
                        <Link to={`/events/detail-event/${eventId}`}>
                            <p
                                className="outline-none w-40 h-14 hover:bg-[#1c5291]
                             bg-[#386fd6] rounded-lg text-center content-center text-white"
                            >
                                {buttonName}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListEvent;
